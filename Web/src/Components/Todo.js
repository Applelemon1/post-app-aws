import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "../App.css";
import axios from "axios";
import { baseURL } from "../lib";
import { useLocation, useNavigate } from "react-router-dom";

export const Todo = (props) => {
  const { state } = useLocation();
  const [input, setInput] = useState();
  const [image, setImage] = useState("");
  const [showArr, SetShowArr] = useState([]);
  const [editIndex, SetEditIndex] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [removeIndex, setRemoveIndex] = useState();
  const [pressPost, setPressPost] = useState(false);
  let navigate = useNavigate();

  // const [pressUpdate, setPressPost] = useState(false);

  // console.log("showArr", showArr);
  const ShowArrFunc = async () => {
    let temp = showArr?.length ? [...showArr] : [];
    if (input?.trim().length) {
      temp.push(input);
      let tempTodo = {
        title: input,
        image: image,
        whoPost: state
      };
      setIsLoading(true);
      await axios
        .post(`${baseURL}/create`, tempTodo)
        .then((res) => {
          console.log("ku");
          setInput("");

          setImage("");
          setPressPost(!pressPost);
          //  console.log('prespo',pressPost)
        })
        .catch((err) => {
          console.log("err", err);
        });
      // console.log("ku2");
      const file = document.querySelector(".file");
      file.value = "";
    }
  };
  // console.log("is loading is ", isLoading);

  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  };

  const Remove = async (remIndex) => {
    setRemoveIndex(remIndex);
    console.log("removed index", remIndex);
    await axios
      .delete(`${baseURL}/delete/${remIndex}`)
      .then(() => {
        setRemoveIndex(null);
      })
      .catch(() => {
        setRemoveIndex(null);
      });
  };

  const Edit = (EditIndex) => {
    let temp = [...showArr];
    temp = temp.filter((item, index) => item?._id === EditIndex)[0];
    console.log("temp is ", temp);
    setInput(temp.title);
    SetEditIndex(EditIndex);
  };

  const Update = async () => {
    let temp = [...showArr];
    temp[editIndex] = input;
    setIsLoading(true);

    await axios.put(`${baseURL}/put/${editIndex}`, { title: input });

    SetEditIndex(false);
    setInput("");
    setPressPost(!pressPost);
  };

  // const DeleteAll = async () => {
  //   SetShowArr([]);
  //   await axios.delete(`${baseURL}/deleteAll`, {});
  //   setInput("");
  // };

  useEffect(() => {
    if (state == null) {
      alert("please login first.");
      navigate("/");
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    console.log("fetching", props.state);
    console.log("เช้ค location", state);

    fetch(`${baseURL}/todos`)
      .then((res) => {
        console.log("res json front", res);
        if (res.ok) {
          return res.json();
        }
      })
      .then((resData) => {
        console.log("เฟตเสดละ");
        // if(image !== ''){
        //   console.log('โหลดเพิ่ม5วิ มีรูป')
        //   setTimeout(() => setIsLoading(false), 3000);
        // }else{
        setIsLoading(false);

        // }
        SetShowArr(resData);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [pressPost, removeIndex]);
  // }, [input, Remove, Update, DeleteAll]);

  const Loader = () => {
    // return <div>{image == ''?<h5>Loading . . .</h5> :<h5>Loading . . . (upload image will take a seconds)</h5>}</div>;
    return <h5>Loading . . .</h5>;

  };

  return !isLoading ? (
    <form
      onSubmit={(e) => {
        if(input == ''){
          alert('please enter the text.')
        }
        e.preventDefault();
        if (editIndex || editIndex === 0) {
          Update();
        } else ShowArrFunc();
      }}
    >
      <div style={{ justifyContent: "end", display: "flex" }}>
        {" "}
        <Button variant={"secondary"} onClick={() => navigate("/")}>
          Logout
        </Button>
      </div>
      <br></br>
      <Form.Control
        type="text"
        as="textarea"
        rows={3}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        autoFocus={true}
        placeholder="what do you think ..."
      />
      <br />
      <div className="uploadandpost">
        <input
          id="chooseImage"
          class="file"
          type="file"
          accept="image/*"
          onChange={convertToBase64}
        ></input>
        {/* <div className="postAndDeleteAll"> */}
        {editIndex || editIndex === 0 ? (
          <Button type="submit" variant="success" disabled={input == ''? true:false}>
            Update
          </Button>
        ) : (
          <Button type="submit" variant="success" disabled={input == ''? true:false}>
            Post
          </Button>
        )}
        {/* &nbsp;{" "}
      <Button
        onClick={() => DeleteAll()}
        className="deleteall"
        variant="danger"
      >
        Delete All
      </Button> */}
        {/* </div> */}
      </div>

      <br></br>
      <br></br>
      {showArr?.length
        ? Object.values(showArr).map((item, index) => (
            <div
              className="cardPost"
              key={index}
              style={{ marginBottom: "10px" }}
            >
              <div className="postBy">
                posted by : {item?.whoPost}
                <span>
                  {" "}
                  <Button
                    type="button"
                    className="todoEditbtn"
                    onClick={() => Edit(item?._id)}
                    variant="primary"
                  >
                    {" "}
                    Edit{" "}
                  </Button>
                  <Button
                    variant="danger"
                    className="todoDeletebtn"
                    type="button"
                    onClick={() => Remove(item?._id)}
                  >
                    {" "}
                    X{" "}
                  </Button>
                </span>
              </div>
              <br></br>
              {item.image == "" ? (
                ""
              ) : (
                <div>
                  <img
                    width={200}
                    height={200}
                    src={item?.image}
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  ></img>{" "}
                  <br></br>
                  <br />
                </div>
              )}
              <span className="todoInputList">{item?.title}</span>
            </div>
          ))
        : ""}
      <br />
    </form>
  ) : (
    Loader()
  );
};
