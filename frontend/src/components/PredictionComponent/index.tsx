import React from "react";
import styles from "./index.module.css";
import moment from "moment";

const PredictionComponent = ({ prediction }: any) => {
  return (
    <p className={styles.predictionComponent}>
      {prediction.fullName} devrait acheter {prediction.amount}€ d'action{" "}
      {prediction.company} le {moment(prediction.buyingDate).format("DD/MM/YYYY")} au
      prix de {prediction.buyingPrice}€. Il devrait ensuite vendre ces actions
      le {moment(prediction.sellingDate).format("DD/MM/YYYY")} au prix de{" "}
      {prediction.sellingPrice}€ pour faire un gain de {prediction.gain}€.
    </p>
  );
};

export default PredictionComponent;
