import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as Api from "../../api";

const GuestbookEdit = ({ comment, setGuestBooks, setIsEdit, fetch }) => {
  const [inputs, setInputs] = useState({
    comment: comment.comment,
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      [name]: value,
    });
  };

  const editHandler = async (e) => {
    const response = await Api.put(`comments/${comment._id}`, inputs);
    const editComment = response.data;
    setIsEdit(false);

    setGuestBooks((prev) => {
      const newGB = prev.map((v) => {
        if (v._id === comment._id) {
          return editComment;
        } else return v;
      });
      return newGB;
    });
    fetch();
  };
  return (
    <Form.Group>
      <Form.Group className="mt-3" controlId="formBasicPassword">
        <Form.Control
          className="mb-2"
          name="comment"
          defaultValue={comment.comment}
          as="textarea"
          rows={3}
          onChange={onChange}
        />
      </Form.Group>

      <div style={{ textAlign: "center" }} className="mb-1">
        <Button
          variant="primary"
          type="submit"
          style={{ marginRight: "10px" }}
          onClick={editHandler}
        >
          확인
        </Button>
        <Button
          variant="secondary"
          type="submit"
          style={{ marginLeft: "10px" }}
          onClick={() => setIsEdit(false)}
        >
          취소
        </Button>
      </div>
    </Form.Group>
  );
};

export default GuestbookEdit;
