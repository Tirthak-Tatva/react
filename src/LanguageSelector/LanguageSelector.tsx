import React from "react";
import i18n from "i18next";
import { Component } from "react";

class LanguageSelector extends Component {
  // const { t, i18n } = useTranslation()

  // changeLanguage = (event) => {
  //   i18n.changeLanguage(event.target.value);
  // };

  render() {
    return (
      <div>
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    );
  }
}

export default LanguageSelector;
