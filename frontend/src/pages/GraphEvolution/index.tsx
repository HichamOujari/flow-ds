import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import ChartComponent from "../../components/ChartComponent";
import PredictionComponent from "../../components/PredictionComponent";
import axios from "axios";
import API from "../../config/API";

const GraphEvolution = () => {
  const [predictions, setPredictions] = useState<any>();
  const [stats, setStats] = useState<any>();
  // eslint-disable-next-line
  const [orders, setOrders] = useState<any>([
    {
      user: "Anouar",
      company: "Google",
      amount: 100000,
    },
    {
      user: "Aymen",
      company: "Amazon",
      amount: 100000,
    },
  ]);

  const getStats = async (list: any) => {
    try {
      const { data } = await axios.post(API.FETCH_DATA, {
        list,
      });
      setStats(data);
    } catch (err) {
      //
    }
  };

  const getPredictions = async () => {
    try {
      const data: { data: any }[] = await Promise.all(
        orders.map((order: any) =>
          axios.get(API.PREDICTION, {
            params: order,
          })
        )
      );
      setPredictions(data.map((ele) => ele.data));
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    getStats(["Amazon", "Google"]);
    getPredictions();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>evolution du prix des actions Amazone et Google sur 2023</h1>
      </div>
      <div className={styles.graphContainer}>
        <ChartComponent datasets={stats} />
      </div>
      {predictions && predictions.length && (
        <div className={styles.predictionContainer}>
          {predictions.map((prediction: any) => (
            <PredictionComponent prediction={prediction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GraphEvolution;
