import { useEffect, useRef, useState } from "react";
import styles from "../styles/PainelConteudos.module.css";

const PainelConteudos = () => {
  const [lado, setLado] = useState("right");

  const [horizontal, setHorizontal] = useState(50);

  const [vertical, setVertical] = useState(70);

  const personagem = useRef<HTMLImageElement>(null);

  function onClick(event) {
    const x = event.pageX;
    const y = event.pageY;

    if (x < parseInt(personagem.current!.style.left)) setLado("left");

    if (x > parseInt(personagem.current!.style.left)) setLado("right");

    if (
      Math.abs(x - parseInt(personagem.current!.style.left)) <
        Math.abs(y - parseInt(personagem.current!.style.top)) &&
      y < parseInt(personagem.current!.style.top)
    ) {
      setLado("up");
    }
    if (
      Math.abs(x - parseInt(personagem.current!.style.left)) <
        Math.abs(y - parseInt(personagem.current!.style.top)) &&
      y > parseInt(personagem.current!.style.top)
    ) {
      setLado("down");
    }

    setHorizontal(x);
    setVertical(y);
  }

  useEffect(() => {
    personagem.current!.style.left = `${horizontal + 200}px`;
    personagem.current!.style.top = `${vertical - 100}px`;


  }, [horizontal, vertical]);

  return (
    <div className={styles.container}>
      <div className={styles.cenario}>
        <div className={styles.chao} onClick={onClick}>
          <img
            className={styles.personagem}
            src={`/personagem_movimentation/${lado}.gif`}
            ref={personagem}
          />
        </div>
      </div>
    </div>
  );
};

export default PainelConteudos;
