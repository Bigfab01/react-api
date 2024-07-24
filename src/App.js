import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash'
import axios from 'axios'
import Form from './component/Form';


function App() {

  const [data, setData] = useState([])// where to store the returned data
  const [error, setError] = useState(null)// where to store the coming errrors

  const requestOne = axios.get("https://api.storyblok.com/v1/cdn/stories/health?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt");
  const requestTwo = axios.get("https://api.storyblok.com/v1/cdn/datasources/?token=wANpEQEsMYGOwLxwXQ76Ggtt");
  const requestThree = axios.get("https://api.storyblok.com/v1/cdn/stories/vue?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt");


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData= () => {// the function to fetch data from the api

  //   fetch("https://hn.algolia.com/api/v1/search?query=redux")
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((json) => setData(json.hits))
  //     .catch(err => setError(err.message));
  // }

  axios
      .all([requestOne, requestTwo, requestThree])
      .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {
          const data1 = firstResponse.data;
          console.log('Name: ', data1.story.content.taglist.plugin)
          console.log('Second', secondResponse.data)
          console.log('Third', thirdResponse.data);
      }))
      .catch(errors => {
          console.error(errors);
      });
  
  // axios.get('https://hn.algolia.com/api/v1/search?query=redux')
  //           .then((response) => {
  //               setData(response.data.hits)
  //           })
  //           .catch((error) => {
  //               // handle error
  //               // console.log(error);
  //               setError(error)
  //           })
    }

  return (
    <div className="App">
      { !isEmpty(error) ? error : 'Data Fetched' }
        {/* { !isEmpty(error) && error } */}
        <ul>
          {
              !isEmpty(data) && data.map((item, index) => 
                  <li key={index}>
                      <span>{item.title} </span>
                      {/* <a href='google.com'>Welcome to Google</a> */}
                      <a href={item.url}>{item.title} ({item.author})</a>
                  </li>
              )
          }
        </ul>
        <Form/>
    </div>
  );
}

export default App;
