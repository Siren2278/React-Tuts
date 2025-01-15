/* FETCH API USING JSONPLACEHOLDER
    - is a REST API that you can use whenever you need some fake data.
 */

import { useState, useEffect } from 'react';
import Form from './Form';
// import List from './List';
import Table from './Table';

// Utility function to flatten nested objects
const flattenObject = (obj, prefix = '') => {
  let result = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      // If the value is an object, recursively flatten it
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          result[newKey] = JSON.stringify(obj[key]);  // You can also leave the array as is
        } else {
          Object.assign(result, flattenObject(obj[key], newKey));  // Recursively flatten
        }
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
};

function App() {
  /* 
    API base URL to fetch data from. 
    The API will be dynamically accessed based on the `reqType` state.
  */
  const API_URL = 'https://jsonplaceholder.typicode.com/';
  
  /* 
    State to manage the type of request we want to make (e.g., users, posts, etc.)
    Default is set to 'users', meaning it will fetch user data initially.
  */
  const [reqType, setReqType] = useState('users');
  
  /* 
    State to store the fetched data items. 
    Once data is fetched, this state will be updated to hold the array of items.
  */
  const [items, setItems] = useState([]);

  useEffect(() => {
    /* 
      Fetch data based on the current `reqType`. 
      This function will fetch data from the API whenever `reqType` changes.
    */
    const fetchItems = async () => {
      try {
        /* 
          Fetch data from the API, appending the `reqType` to the base URL to specify
          which type of data we want (users, posts, etc.).
        */
        const response = await fetch(`${API_URL}${reqType}`);
        
        /* 
          Convert the response into JSON format so we can work with the data easily.
        */
        const data = await response.json();
        
        /* 
          Update the `items` state with the fetched data, making it available for rendering.
          Flatten each item before updating the sta
        */
        const flattenedData = data.map(item => flattenObject(item));
        setItems(flattenedData);
      } catch (err) {
        /* 
          Log any error that might occur during the fetch process.
        */
        console.log(err);
      }
    };

    /* 
      Call `fetchItems` every time `reqType` changes.
      The useEffect dependency array ensures this happens automatically.
    */
    fetchItems();

  }, [reqType]);  /* Re-run the effect whenever `reqType` changes */

  return (
    <div className="App">
      {/* 
        Render the Form component and pass `reqType` and `setReqType` as props. 
        This allows the form to change the `reqType`, triggering a new fetch.
      */}
      <Form reqType={reqType} setReqType={setReqType} />

      {/* 
        Render the Table component and pass `items` as a prop. 
        This will display the fetched data in a table format.
      */}
      <Table items={items} />
      {/* <List items={items} /> */}
    </div>
  );
}

export default App;