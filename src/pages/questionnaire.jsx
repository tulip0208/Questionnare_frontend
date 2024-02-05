import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../app/config';
import { Button } from 'flowbite-react';
import lang from '../lang/lang';

function Questionnaire() {
  const location = useLocation();

  // Access the query string from the location object
  const queryString = location.search;

  // You can also parse the query string into an object
  const queryParams = new URLSearchParams(queryString);
  const store_url_name = queryParams.get('name'); // Replace 'paramName' with your actual parameter name

  const [store_name, setStoreName] = useState("")
  const [store_business_url, setBusinessURL] = useState("")

  const [questionStatus, setQuestionStatus] = useState({
    Q1: {
      display: 1,
      answer: -1,
      error: 0
    },
    Q2: {
      display: 0,
      answer: -1,
      error: 0
    },
    Q3: {
      display: 0,
      answer: -1,
      error: 0,
    },
    Q4: {
      display: 0,
      answer: -1,
      error: 0
    },
    Q5: {
      display: 0,
      answer: -1,
      error: 0
    },
    Q6_1: {
      display: 0,
      answer: -1,
      error: 0
    },
    Q6_2: {
      display: 0,
      answer: -1,
      error: 0
    },
    Q7: {
      display: 0,
      answer: -1,
      error: 0
    },
    Q8: {
      display: 0,
      answer: -1,
      error: 0
    },
    Q9: {
      display: 0,
      answer: "",
      error: 0
    },
    Congratlation1: {
      display: 0
    },
    Congratlation2: {
      display: 0
    },
  });

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

  useEffect(() => {
    if(questionStatus.Congratlation1.display === 1 || questionStatus.Congratlation2.display === 1) {
      sendAnswer()
    }
  }, [ questionStatus.Congratlation1.display, questionStatus.Congratlation2.display ])

  const changeQuestion9 = (value) => {
    setQuestionStatus((prevQuestionStatus) => ({
      ...prevQuestionStatus,
      Q9: {
        ...prevQuestionStatus.Q9,
        answer: value
      }
    }));
  }

  const changeQuestionStatus2 = (value, question, nextQuestion) => {

    setQuestionStatus((prevQuestionStatus) => ({
      ...prevQuestionStatus,
      [question]: {
        error: 0,
        display: 0,
        answer: value
      },
      [nextQuestion]: {
        ...prevQuestionStatus[nextQuestion],
        display: 1,
      }
    }));

  }

  const previousQuestion = (previousQuestion, question) => {
    setQuestionStatus((prevQuestionStatus) => ({
      ...prevQuestionStatus,
      [previousQuestion]: {
        ...prevQuestionStatus[previousQuestion],
        display: 1
      },
      [question]: {
        ...prevQuestionStatus[question],
        display: 0,
      }
    }));
  }

  const nextQuestion = (question, nextQuestion) => {
    if(questionStatus[question].answer === -1) {
      setQuestionStatus((prevQuestionStatus) => ({
        ...prevQuestionStatus,
        [question]: {
          ...prevQuestionStatus[question],
          error: 1,
        }
      }));
    }
    else {
      setQuestionStatus((prevQuestionStatus) => ({
        ...prevQuestionStatus,
        [question]: {
          ...prevQuestionStatus[question],
          display: 0
        },
        [nextQuestion]: {
          ...prevQuestionStatus[nextQuestion],
          display: 1
        }
      }));
    }
  }

  const sendAnswer = () => {
    let temp = {
      happy: questionStatus.Q1.answer,
      sex: questionStatus.Q2.answer,
      age: questionStatus.Q3.answer,
      sex_doctor: questionStatus.Q4.answer,
      age_doctor: questionStatus.Q5.answer,
      
      stage_today: questionStatus.Q6_1.answer,

      cure: questionStatus.Q6_2.answer,
      waiter: questionStatus.Q7.answer,
      pointer: questionStatus.Q8.answer,

      store_name,
      store_business_url,
      store_url_name
    }

    axios.post(`${config.server_url}/review/create`, temp)
        .then(function(response){
          if(response.data.message === lang("en", "created"))
            if(questionStatus.Congratlation1.display === 1){
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

  return (
    <div className='flex flex-col bg-gray-200 h-screen'>
      <header className='text-center bg-orange-200'>
        <h1 className='mt-5 mb-5 font-black'>店舗評価アンケート</h1>
        <h2 className='text-sm mb-2 sm:text-xl'>{store_name}</h2>
        <h2 className='text-sm mb-2 sm:text-xl'>(所要時間1分)</h2>
      </header>

      {/* happy Q1 */}
      {questionStatus.Q1.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'>*</span>
              <p className='text-3xl font-semibold'>Q1</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>今日の満足度を教えてください</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-60 sm:w-72">
              <div className="flex flex-row items-center justify-start mt-1">
                <input checked={questionStatus.Q1.answer === "1"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q1", "Q2") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" name="like" value={1} />
                <label className={questionStatus.Q1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'} onClick={() => { changeQuestionStatus2("1", "Q1", "Q2") }} htmlFor="like">満足</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input checked={questionStatus.Q1.answer === "2"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q1", "Q2") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" name="like" value={2} />
                <label  className={questionStatus.Q1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'} onClick={() => { changeQuestionStatus2("2", "Q1", "Q2") }} htmlFor="dislike">いくつかの苦情</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { nextQuestion("Q1", "Q2") }} className='sm:w-36 w-80 bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }

      {/* my sex Q2 */}
      {questionStatus.Q2.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'>*</span>
              <p className='text-3xl font-semibold'>Q2</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>あなたの性別を教えてください。</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-60 sm:w-72">
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="sex" checked={questionStatus.Q2.answer === "1"} value={1} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q2", "Q3") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("1", "Q2", "Q3") }} className={questionStatus.Q2.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'} htmlFor="like">男性</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="sex" checked={questionStatus.Q2.answer === "2"} value={2} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q2", "Q3") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("2", "Q2", "Q3") }} className={questionStatus.Q2.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'} htmlFor="dislike">女性</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="sex" checked={questionStatus.Q2.answer === "3"} value={3} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q2", "Q3") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("3", "Q2", "Q3") }} className={questionStatus.Q2.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'} htmlFor="dislike">その他</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="sex" checked={questionStatus.Q2.answer === "4"} value={4} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q2", "Q3") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("4", "Q2", "Q3") }} className={questionStatus.Q2.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'} htmlFor="dislike">回答しない</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { previousQuestion("Q1", "Q2") }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
            <button onClick={() => { nextQuestion("Q2", "Q3") }} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }

      {/* my age Q3 */}
      {questionStatus.Q3.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'>*</span>
              <p className='text-3xl font-semibold'>Q3</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>あなたの年齢を教えてください。</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-60 sm:w-72">
              <div className="flex flex-row items-center justify-start">
                <input name="age" value={1} checked={questionStatus.Q3.answer === "1"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q3", "Q4") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("1", "Q3", "Q4") }} className={questionStatus.Q3.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>１０代以下</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="age" value={2} checked={questionStatus.Q3.answer === "2"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q3", "Q4") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("2", "Q3", "Q4") }} className={questionStatus.Q3.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>２０代</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="age" value={3} checked={questionStatus.Q3.answer === "3"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q3", "Q4") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("3", "Q3", "Q4") }} className={questionStatus.Q3.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>３０代</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="age" value={4} checked={questionStatus.Q3.answer === "4"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q3", "Q4") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("4", "Q3", "Q4") }} className={questionStatus.Q3.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>４０代</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="age" value={5} checked={questionStatus.Q3.answer === "5"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q3", "Q4") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("5", "Q3", "Q4") }} className={questionStatus.Q3.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>５０代</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="age" value={6} checked={questionStatus.Q3.answer === "6"} onChange={(event) => { changeQuestionStatus2(event, "Q3", "Q4") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("6", "Q3", "Q4") }} className={questionStatus.Q3.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>６０代以上</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { previousQuestion("Q2", "Q3") }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
            <button onClick={() => { nextQuestion("Q3", "Q4") }} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }


      {/* doctor_sex Q4 */}
      {questionStatus.Q4.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'>*</span>
              <p className='text-3xl font-semibold'>Q4</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>今日担当セラピストの性別を教えてください。</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-60 sm:w-72">
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="doctor_sex" value={1} checked={questionStatus.Q4.answer === "1"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q4", "Q5") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("1", "Q4", "Q5") }} className={questionStatus.Q4.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'} htmlFor="like">男性</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="doctor_sex" value={2} checked={questionStatus.Q4.answer === "2"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q4", "Q5") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("2", "Q4", "Q5") }} className={questionStatus.Q4.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'} htmlFor="dislike">女性</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { previousQuestion("Q3", "Q4") }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
            <button onClick={() => { nextQuestion("Q4", "Q5") }} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }



      {/* doctor_age Q5 */}
      {questionStatus.Q5.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'>*</span>
              <p className='text-3xl font-semibold'>Q5</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>今日担当セラピストの年齢を教えてください。</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-60 sm:w-72">
              <div className="flex flex-row items-center justify-start">
                <input name="doctor_age" value={1} checked={questionStatus.Q5.answer === "1"} onChange={(event) => { questionStatus.Q1.answer === "1" ? changeQuestionStatus2(event.target.value, "Q5", "Q6_1") : changeQuestionStatus2(event.target.value, "Q5", "Q6_2") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { questionStatus.Q1.answer === "1" ? changeQuestionStatus2("1", "Q5", "Q6_1") : changeQuestionStatus2("1", "Q5", "Q6_2") }} className={questionStatus.Q5.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>１０代以下</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="doctor_age" value={2} checked={questionStatus.Q5.answer === "2"} onChange={(event) => { questionStatus.Q1.answer === "1" ? changeQuestionStatus2(event.target.value, "Q5", "Q6_1") : changeQuestionStatus2(event.target.value, "Q5", "Q6_2") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { questionStatus.Q1.answer === "2" ? changeQuestionStatus2("1", "Q5", "Q6_1") : changeQuestionStatus2("1", "Q5", "Q6_2") }} className={questionStatus.Q5.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>２０代</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="doctor_age" value={3} checked={questionStatus.Q5.answer === "3"} onChange={(event) => { questionStatus.Q1.answer === "1" ? changeQuestionStatus2(event.target.value, "Q5", "Q6_1") : changeQuestionStatus2(event.target.value, "Q5", "Q6_2") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { questionStatus.Q1.answer === "3" ? changeQuestionStatus2("1", "Q5", "Q6_1") : changeQuestionStatus2("1", "Q5", "Q6_2") }} className={questionStatus.Q5.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>３０代</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="doctor_age" value={4} checked={questionStatus.Q5.answer === "4"} onChange={(event) => { questionStatus.Q1.answer === "1" ? changeQuestionStatus2(event.target.value, "Q5", "Q6_1") : changeQuestionStatus2(event.target.value, "Q5", "Q6_2") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { questionStatus.Q1.answer === "4" ? changeQuestionStatus2("1", "Q5", "Q6_1") : changeQuestionStatus2("1", "Q5", "Q6_2") }} className={questionStatus.Q5.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>４０代</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="doctor_age" value={5} checked={questionStatus.Q5.answer === "5"} onChange={(event) => { questionStatus.Q1.answer === "1" ? changeQuestionStatus2(event.target.value, "Q5", "Q6_1") : changeQuestionStatus2(event.target.value, "Q5", "Q6_2") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { questionStatus.Q1.answer === "5" ? changeQuestionStatus2("1", "Q5", "Q6_1") : changeQuestionStatus2("1", "Q5", "Q6_2") }} className={questionStatus.Q5.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>５０代</label>
              </div>
              <div className="flex flex-row items-center justify-start mt-1">
                <input name="doctor_age" value={6} checked={questionStatus.Q5.answer === "6"} onChange={(event) => { questionStatus.Q1.answer === "1" ? changeQuestionStatus2(event.target.value, "Q5", "Q6_1") : changeQuestionStatus2(event.target.value, "Q5", "Q6_2") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { questionStatus.Q1.answer === "6" ? changeQuestionStatus2("1", "Q5", "Q6_1") : changeQuestionStatus2("1", "Q5", "Q6_2") }} className={questionStatus.Q5.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>６０代以上</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { previousQuestion("Q4", "Q5") }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
            <button onClick={() => { questionStatus.Q1.answer === "1" ? nextQuestion("Q5", "Q6_1") : nextQuestion("Q5", "Q6_2")}} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }



      {/* stage Q6_1 */}
      {questionStatus.Q6_1.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'>*</span>
              <p className='text-3xl font-semibold'>Q6</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>本日のご来店のきっかけを教えてください。</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-60 sm:w-72">
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={1} checked={questionStatus.Q6_1.answer === "1"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("1", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>通りすがりで気になって</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={2} checked={questionStatus.Q6_1.answer === "2"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("2", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>近所</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={3} checked={questionStatus.Q6_1.answer === "3"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("3", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>食べログ</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={4} checked={questionStatus.Q6_1.answer === "4"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("4", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>Instagram</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={5} checked={questionStatus.Q6_1.answer === "5"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("5", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>Twitter</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={6} checked={questionStatus.Q6_1.answer === "6"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("6", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>Google Mapsの検索</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={7} checked={questionStatus.Q6_1.answer === "7"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("7", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>Googleのクチコミ</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={8} checked={questionStatus.Q6_1.answer === "8"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("8", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>広告</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={9} checked={questionStatus.Q6_1.answer === "9"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("9", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>知人からの紹介</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="stage" value={10} checked={questionStatus.Q6_1.answer === "10"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_1", "Congratlation1") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("10", "Q6_1", "Congratlation1") }} className={questionStatus.Q6_1.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>その他</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { previousQuestion("Q5", "Q6_1") }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
            <button onClick={() => { nextQuestion("Q6_1", "Congratlation1") }} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }



      {/* fit Q6_2 */}
      {questionStatus.Q6_2.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'>*</span>
              <p className='text-3xl font-semibold'>Q6</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>担当は施術中 お客様へ適切なヒアリングはできていましたか?</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-60 sm:w-72">
              <div className="flex flex-row items-center justify-start">
                <input name="fit" value={1} checked={questionStatus.Q6_2.answer === "1"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_2", "Q7") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("1", "Q6_2", "Q7") }} className={questionStatus.Q6_2.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>かなり良い</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="fit" value={2} checked={questionStatus.Q6_2.answer === "2"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_2", "Q7") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("2", "Q6_2", "Q7") }} className={questionStatus.Q6_2.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>良い</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="fit" value={3} checked={questionStatus.Q6_2.answer === "3"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_2", "Q7") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("3", "Q6_2", "Q7") }} className={questionStatus.Q6_2.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>普通</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="fit" value={4} checked={questionStatus.Q6_2.answer === "4"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_2", "Q7") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("4", "Q6_2", "Q7") }} className={questionStatus.Q6_2.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>良くない</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="fit" value={5} checked={questionStatus.Q6_2.answer === "5"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q6_2", "Q7") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("5", "Q6_2", "Q7") }} className={questionStatus.Q6_2.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>悪い</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { previousQuestion("Q5", "Q6_2") }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
            <button onClick={() => { nextQuestion("Q6_2", "Q7") }} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }


      {/* waitress Q7 */}
      {questionStatus.Q7.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'>*</span>
              <p className='text-3xl font-semibold'>Q7</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>担当の接客はいかがでしたでしょうか?</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-60 sm:w-72">
              <div className="flex flex-row items-center justify-start">
                <input name="waitress" value={1} checked={questionStatus.Q7.answer === "1"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q7", "Q8") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("1", "Q7", "Q8") }} className={questionStatus.Q7.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>かなり良い</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="waitress" value={2} checked={questionStatus.Q7.answer === "2"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q7", "Q8") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("2", "Q7", "Q8") }} className={questionStatus.Q7.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>良い</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="waitress" value={3} checked={questionStatus.Q7.answer === "3"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q7", "Q8") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("3", "Q7", "Q8") }} className={questionStatus.Q7.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>普通</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="waitress" value={4} checked={questionStatus.Q7.answer === "4"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q7", "Q8") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("4", "Q7", "Q8") }} className={questionStatus.Q7.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>良くない</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="waitress" value={5} checked={questionStatus.Q7.answer === "5"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q7", "Q8") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("5", "Q7", "Q8") }} className={questionStatus.Q7.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>悪い</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { previousQuestion("Q6_2", "Q7") }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
            <button onClick={() => { nextQuestion("Q7", "Q8") }} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }



      {/* technical Q8 */}
      {questionStatus.Q8.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'>*</span>
              <p className='text-3xl font-semibold'>Q8</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>担当の技術力はいかがでしたでしょうか?</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-60 sm:w-72">
              <div className="flex flex-row items-center justify-start">
                <input name="technical" value={1} checked={questionStatus.Q8.answer === "1"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q8", "Q9") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("1", "Q8", "Q9") }} className={questionStatus.Q8.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>かなり良い</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="technical" value={2} checked={questionStatus.Q8.answer === "2"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q8", "Q9") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("2", "Q8", "Q9") }} className={questionStatus.Q8.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>良い</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="technical" value={3} checked={questionStatus.Q8.answer === "3"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q8", "Q9") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("3", "Q8", "Q9") }} className={questionStatus.Q8.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>普通</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="technical" value={4} checked={questionStatus.Q8.answer === "4"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q8", "Q9") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("4", "Q8", "Q9") }} className={questionStatus.Q8.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>良くない</label>
              </div>
              <div className="flex flex-row items-center justify-start">
                <input name="technical" value={5} checked={questionStatus.Q8.answer === "5"} onChange={(event) => { changeQuestionStatus2(event.target.value, "Q8", "Q9") }} className='mr-3 enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500' type="radio" />
                <label onClick={() => { changeQuestionStatus2("5", "Q8", "Q9") }} className={questionStatus.Q8.error === 0 ? 'text-base font-medium' : 'text-base font-medium text-red-500'}>悪い</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { previousQuestion("Q7", "Q8") }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
            <button onClick={() => { nextQuestion("Q8", "Q9") }} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }



      {/* point Q9 */}
      {questionStatus.Q9.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className=' bg-white sm:w-3/5 w-11/12 rounded-lg mt-10'>
            <div className="flex justify-center">
              <span className='text-3xl text-red-600'></span>
              <p className='text-3xl font-semibold'>Q9</p>
            </div>
            <div className="text-center">
              <h2 className='text-lg sm:text-2xl font-bold'>改善できるポイントがあれば教えてください?</h2>
            </div>
          </div>
          <div className=' bg-white sm:w-3/5 w-11/12 flex flex-col text-center mt-8 rounded-lg items-center justify-center'>
            <div className="my-2 w-11/12">
              <div className="flex flex-row items-center justify-start">
                <input name="technical" value={questionStatus.Q9.answer} onChange = { (event) => { changeQuestion9(event.target.value) }} className='focus:border-sky-200	w-full	rounded border-gray-300' type="text" placeholder='回答を入力' />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5">
            <button onClick={() => { previousQuestion("Q8", "Q9") }} className='w-32 sm:w-36  bg-white focus:outline-none hover:border-gray-100 hover:bg-gray-100 mr-4' type='button'>戻る</button>
            <button onClick={() => { nextQuestion("Q9", "Congratlation2") }} className='w-32 sm:w-36  bg-orange-400 focus:outline-none hover:bg-orange-500 hover:border-orange-400	text-white' type='button'>次へ</button>
          </div>
        </main>
      }

      {/* congratlation1 */}
      {questionStatus.Congratlation1.display === 1 &&
        <main className='flex flex-col items-center'>
          <div className='sm:w-3/5 w-11/12 mt-10'>
            <h2 className='text-center text-2xl text-blue-700 font-bold'>ご回答ありがとうございます！</h2>
          </div>
          <div className='w-11/12 flex flex-col text-center mt-8 items-center justify-center'>
            <div className="my-2 w-11/12 rounded-lg bg-white">
              <p className='text-sm	sm:text-lg font-medium'>アンケートにご協力いただき誠にありがとうございます。</p>
              <p className='text-sm	sm:text-lg font-medium'>5秒後に自動的に口コミページに移動します。</p>
            </div>
          </div>
        </main>
      }

      {/* congratlation2 */}
      {questionStatus.Congratlation2.display === 1 &&
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

export default Questionnaire

