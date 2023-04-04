import React, { useState } from "react";
import { Button, Descriptions } from "antd";

import Modal from "../../common/modal";
import ModalContent from "./modalContent";
import { disclaimer } from "../../content/disclaimer";

import { LOGIN_FORM } from "../../content/form";
import "./index.css";

const Login = ({ handleLogin = () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        {LOGIN_FORM.LOGIN}
      </Button>
      <Modal
        titleText={showDisclaimer ? "Disclaimer Detail" : LOGIN_FORM.LOGIN}
        visible={visible}
        setVisible={showDisclaimer ? setShowDisclaimer : setVisible}
      >
        {showDisclaimer ? (
          <DisclaimerModalContent />
        ) : (
          <ModalContent
            handleOnLogin={handleLogin}
            handleOnClickDisclaimer={() => setShowDisclaimer(true)}
          />
        )}
      </Modal>
    </>
  );
};

const DisclaimerModalContent = () => {
  return (
    <>
      {[disclaimer.PARAGRAPH1, disclaimer.PARAGRAPH2].map((paragraph) => (
        <p>{paragraph}</p>
      ))}
      <h3>{disclaimer.COOKIE_HEADER}</h3>
      <p>{disclaimer.COOKIE_DESCRIPTION}</p>
      <table>
        <thead>
          <tr>
            <th>Categories of Cookie Usage</th>
            <th>Discription</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Authentication</td>
            <td>{disclaimer.COOKIE_TABLE.Authentication}</td>
          </tr>
          <tr>
            <td>Security</td>
            <td>{disclaimer.COOKIE_TABLE.Security}</td>
          </tr>
          <tr>
            <td>Preferences, features, services</td>
            <td>
              {disclaimer.COOKIE_TABLE["Preferences, features, services"]}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Login;
