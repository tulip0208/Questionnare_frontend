import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../app/config';
import { Button } from 'flowbite-react';
import lang from '../lang/lang';

function Questionnaire1() {
  const location = useLocation();

  // Access the query string from the location object
  const queryString = location.search;

  // You can also parse the query string into an object
  const queryParams = new URLSearchParams(queryString);
  const store_url_name = queryParams.get('name'); // Replace 'paramName' with your actual parameter name
  const store_group_id = queryParams.get('id'); // Replace 'paramName' with your actual parameter name

  const [store_name, setStoreName] = useState("")
  const [store_business_url, setBusinessURL] = useState("")

  const [questionStatus, setQuestionStatus] = useState({
    Congratlation1: {
      previousId: -1,
      display: false
    },
    Congratlation2: {
      previousId: -1,
      display: false
    },
  });

  //server data
  const [questions, setQuestions] = useState([])

  const getData = () => {
    axios.get(`${config.server_url}/papersetting/view`)
      .then(function (response) {
        let temp = response.data.questions.filter(item => item.group_id === store_group_id);
        for (let i = 0; i < temp.length; i++) {
          temp[i] = {
            ...temp[i],
            display: temp[i].question_no === 'Q1',
            error: false,
            answer: -1
          }
        }
        setQuestions(temp)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    axios.post(`${config.server_url}/store/getStoreInfo`, { store_url_name })
      .then(function (response) {
        setStoreName(response.data.storeInfo.store_name)
        setBusinessURL(response.data.storeInfo.store_business_url)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  //
  useEffect(() => {
    if (questionStatus.Congratlation1.display === true || questionStatus.Congratlation2.display === true) {
      sendAnswer()
    }
  }, [questionStatus.Congratlation1.display, questionStatus.Congratlation2.display])
  //
  const changeValue = (value, cur_id) => {
    let temp = questions;
    temp[cur_id].answer = value;
    setQuestions([...temp])
  }
  //
  const changeQuestionStatus2 = (value, cur_id, nextQuestion) => {
    let temp = questions;
    temp[cur_id].answer = value;
    temp[cur_id].display = false;
    temp[cur_id].error = false;

    if (nextQuestion === '最後のアンケート1' || nextQuestion === '最後のアンケート2') {
      setQuestions([...temp])
      if (nextQuestion === '最後のアンケート1') {
        setQuestionStatus({
          ...questionStatus,
          Congratlation1: {
            previousId: cur_id,
            display: true
          }
        })
      }
      else {
        setQuestionStatus({
          ...questionStatus,
          Congratlation2: {
            previousId: cur_id,
            display: true
          }
        })
      }
      return;
    }

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].question_id === nextQuestion) {
        temp[i].display = true;
        temp[i].previousId = cur_id;
      }
    }

    setQuestions([...temp])

  }
  //
  const previousQuestion = (previousId, currentId) => {
    let temp = questions;
    temp[previousId].display = true;
    temp[currentId].display = false;

    setQuestions([...temp])
  }
  const nextQuestion1 = (questionId, require) => {
    if (questions[questionId].answer === -1 && require) {
      let temp = questions;
      temp[questionId].error = true;
      setQuestions([...temp])
      return;
    }
    else if (questions[questionId].connect === '最後のアンケート1' || questions[questionId].connect === '最後のアンケート2') {
      let temp = questions;
      temp[questionId].display = false;
      setQuestions([...temp])
      if (questions[questionId].connect === '最後のアンケート1') {
        setQuestionStatus({
          ...questionStatus,
          Congratlation1: {
            previousId: questionId,
            display: true
          }
        })
      }
      else {
        setQuestionStatus({
          ...questionStatus,
          Congratlation2: {
            previousId: questionId,
            display: true
          }
        })
      }
    }
    else {
      let nextId = '';
      let temp = questions;
      for (let i = 0; i < temp.length; i++)
        if (temp[questionId].connect === temp[i].question_id) nextId = i

      temp[questionId].display = false;

      if (nextId === '') return;

      temp[nextId].display = true;
      temp[nextId].previousId = questionId;

      setQuestions([...temp])
    }

  }
  //
  const nextQuestion = (questionId) => {
    if (questions[questionId].answer === -1) {
      let temp = questions;
      temp[questionId].error = true;
      setQuestions([...temp])
      return;
    }
    else {
      let nextId = '';
      let temp = questions;
      let arr = temp[questionId].select1.split(',')
      for (let i = 0; i < arr.length; i++) if (arr[i] === temp[questionId].answer) nextId = temp[questionId].select2.split(',')[i]

      if (nextId === '最後のアンケート1' || nextId === '最後のアンケート2') {
        temp[questionId].display = false;
        setQuestions([...temp])
        if (nextId === '最後のアンケート1') {
          setQuestionStatus({
            ...questionStatus,
            Congratlation1: {
              previousId: questionId,
              display: true
            }
          })
        }
        else {
          setQuestionStatus({
            ...questionStatus,
            Congratlation2: {
              previousId: questionId,
              display: true
            }
          })
        }
        return;
      }

      temp[questionId].display = false;

      for (let i = 0; i < temp.length; i++) {
        if (nextId === temp[i].question_id) {
          nextId = i;
          break;
        }
      }

      if (nextId === '') return;

      temp[nextId].display = true;
      temp[nextId].previousId = questionId;

      setQuestions([...temp])
    }

  }

  const sendAnswer = () => {
    let temp = []

    let st = ''
    if(questionStatus.Congratlation1.display) st = questionStatus.Congratlation1.previousId
    else st = questionStatus.Congratlation2.previousId
    while(true) {
      temp.push({
          question_no: questions[st].question_no,
          question_name: questions[st].question_name,
          answer: questions[st].answer
      })
      st = questions[st].previousId
      if(st === undefined || st === null || st === -1 || st === '-1' || st === '') break;
    }
    temp.sort((a, b) => parseInt(a.question_no.slice(1, a.question_no.length)) - parseInt(b.question_no.slice(1, b.question_no.length)));

    let question_nos = '';
    let question_names = '';
    let answers = '';

    for(let i = 0; i < temp.length; i++) {
      question_nos += (i === (temp.length - 1) ? temp[i].question_no : temp[i].question_no + ',');
      question_names += (i === (temp.length - 1) ? temp[i].question_name : temp[i].question_name + ',');
      answers += (i === (temp.length - 1) ? temp[i].answer : temp[i].answer + ',');
    }

    temp = {
      question_nos,
      question_names,
      answers,

      store_name,
      store_business_url,
      store_url_name
    }

    axios.post(`${config.server_url}/review/create`, temp)
      .then(function (response) {
        if (response.data.message === lang("en", "success"))
          if (questionStatus.Congratlation1.display === true) {
            setTimeout(() => {
              console.log(store_business_url)
              window.location.href = store_business_url
            }, 1000)
          }
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (store_url_name) {
    return (

      <div className='flex flex-col bg-gray-200 h-screen'>
        <header className='text-center bg-orange-200'>
          <h1 className='mt-5 mb-5 font-black'>店舗評価アンケート</h1>
          <h2 className='text-sm mb-2 sm:text-xl'>{store_name}</h2>
          <h2 className='text-sm mb-2 sm:text-xl'>(所要時間1分)</h2>
        </header>
        {questions.map((item, idx) => (
          item.display === true &&
          <main key={idx} className='flex flex-col items-center'>
            <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
              <div className="flex justify-center">
                <span className='text-3xl text-red-600'>{item.require === true ? '*' : ''}</span>
                <p className='text-3xl font-semibold'>{item.question_no}</p>
              </div>
              <div className="text-center">
                <h2 className='text-lg sm:text-2xl font-bold'>{item.question_name}</h2>
              </div>
            </div>
            <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
              <div className="my-2 w-60 sm:w-72">
                {item.select_type === '1' &&
                  item.select1.split(',').filter(item1 => item1 !== '').map((item2, idx2) =>
                  (<div key={idx2} className="flex flex-row items-center justify-start mt-1">
                    <input checked={item.answer === item2} onChange={(event) => { changeQuestionStatus2(event.target.value, idx, item.select2.split(',')[idx2]) }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" name="like" value={item2} />
                    <label className={item.error === false ? 'text-base font-medium' : 'text-base font-medium text-red-500'} onClick={() => { changeQuestionStatus2(item2, idx, item.select2.split(',')[idx2]) }} htmlFor="like">{item2}</label>
                  </div>
                  ))
                }
              </div>
              {item.select_type === '2' &&
                <div className="my-2 w-11/12">
                  <div className="flex flex-row items-center justify-start">
                    <input name="technical" value={item.answer !== -1 ? item.answer : ''} onChange={(event) => { changeValue(event.target.value, idx) }} className={item.error === false ? 'focus:border-sky-200	w-full	rounded border-gray-300' : 'focus:border-sky-200	w-full	rounded border-red-500'} type="text" placeholder='回答を入力' />
                  </div>
                </div>
              }
            </div>
            {item.question_no === 'Q1' &&
              <div className="flex flex-row items-center mt-5">
                <button onClick={() => { item.select_type === '1' ? nextQuestion(idx) : nextQuestion1(idx, item.require) }} className='sm:w-36 w-80 bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
              </div>
            }
            {item.question_no !== 'Q1' &&
              <div className="flex flex-row items-center mt-5">
                <button onClick={() => { previousQuestion(item.previousId, idx) }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
                <button onClick={() => { item.select_type === '1' ? nextQuestion(idx) : nextQuestion1(idx, item.require) }} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
              </div>
            }
          </main>
        ))
        }

        {/* congratlation1 */}
        {questionStatus.Congratlation1.display === true &&
          <main className='flex flex-col items-center'>
            <div className='sm:w-3/5 w-11/12 mt-10'>
              <h2 className='text-center text-2xl text-blue-700 font-bold'>ご回答ありがとうございます！</h2>
            </div>
            <div className='w-11/12 flex flex-col text-center mt-8 items-center justify-center'>
              <div className="my-2 w-11/12 rounded-lg bg-white">
                <p className='text-sm	sm:text-lg font-medium'>ご回答ありがとうございます!</p>
                <p className='text-sm	sm:text-lg font-medium'>口コミのご協力お願いいたします。</p>
                <p className='mt-3 text-sm	font-medium '>※3秒後に自動的に口コミページに移動します。</p>
              </div>
            </div>
          </main>
        }

        {/* congratlation2 */}
        {questionStatus.Congratlation2.display === true &&
          <main className='flex flex-col items-center'>
            <div className=' sm:w-3/5 w-11/12 mt-10'>
              <h2 className='text-center text-2xl text-blue-700 font-bold'>ご回答ありがとうございます！</h2>
            </div>
            <div className=' w-11/12 flex flex-col text-center mt-8 items-center justify-center'>
              <div className="my-2 w-11/12">
                <p className='text-sm	sm:text-lg font-medium'>アンケートにご協力いただき誠にありがとうございます。</p>
                <p className='text-sm	sm:text-lg font-medium'>回答いただいた内容は、今後のより良いサービス改善に活用していきます。</p>
                <p className='text-sm	sm:text-lg font-medium'>今後とも「{store_name}」をよろしくお願いいたします。</p>
              </div>
            </div>
          </main>
        }

      </div>
    );
  }

  else {
    return (
      <div>

      </div>
    )
  }


}

export default Questionnaire1

