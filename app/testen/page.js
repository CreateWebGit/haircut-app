import React from "react";

const page = () => {
  return (
    <form className="form">
      <div className="styledInput">
        <input
          className="input"
          type="text"
          name="user_name"
          placeholder=" "
          required
        />
        <label className="label">Namn</label>
        <div className="line"></div>
      </div>
      <div className="styledInput">
        <input
          className="input"
          type="text"
          name="user_phone"
          placeholder=" "
          required
        />
        <label className="label">Telefon</label>
        <div className="line"></div>
      </div>
      <div className="styledInput">
        <input
          className="input"
          type="email"
          name="user_email"
          placeholder=" "
          required
        />
        <label className="label">E-post</label>
        <div className="line"></div>
      </div>
      <div className="styledInput">
        <textarea className="textarea" name="message" required />
        <label className="label">Meddelande</label>
        <div className="line"></div>
      </div>
      <div className="submitContainer">
        <input type="submit" value="Skicka" />
      </div>
    </form>
  );
};

export default page;
