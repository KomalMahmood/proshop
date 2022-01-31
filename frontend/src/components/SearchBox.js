import React , { useState } from 'react';
import { Form,Button } from 'react-bootstrap';

const SearchBox = ({history}) => {

    const [keyword,setKeyword] = useState('');

    const submitHandler = (e) => {
     
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/search/${keyword}`);
        }
        else{
            history.push('/');
        }
    }

    return (
      <>
        <Form onSubmit={submitHandler} inline>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="Serach Products... "
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
        </Form>

        <Button
          type="submit"
          variant="outline-success"
          style={{ "padding": "0.65rem", marginLeft : "0.5rem" }}
          onClick={submitHandler}
        >
          Search
        </Button>
      </>
    );
}

export default SearchBox;
