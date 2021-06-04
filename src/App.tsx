import React, { useEffect, useRef, useState, useMemo } from "react";
import { Cell } from "./gol/Cell";
import { Time } from "./gol/Time";
import { Scene } from "./gol/SceneSpace";
import * as create from "./gol/create";

import "./App.css";
const otherTime = new Time([], 'red')
function App() {
  const refCanvas = useRef<any>();
  const contextRef = useRef<any>()
  const timeRef = useRef<any>();
  // const [lifeTime, lifeTimeSet] = useState(0)
  // const [message, messageSet] = useState('')
  // const [aliveCell, aliveCellSet] = useState(0)
  const time = useMemo(() => new Time([]), [])
  const scene = useMemo(() => new Scene(1000, 1000), [])
  useMemo(() => {
    const creatEle = (arr: any) => {
      arr.forEach((item: any) => {
        const [x, y] = item
        new Cell([x, y], 'alive', time, scene)
      })
    }
    // creatEle(create.createGospersGliderGun([20, 40]))
    // creatEle(create.createLightWeightSpaceship([20, 20]))
    // new Cell([150, 100], 'alive', time, scene)
    for (let i = 1; i < 18; i++) {
      for (let j = 1; j < 18; j++) {
        create.createBigRect([40 * i, 50 * j]).forEach(([x, y]) => {
          new Cell([x, y], 'alive', time, scene)
        })
      }
    }

  }, [])
  const draw = (item: ReturnType<typeof scene.pop>) => {
    const ctx = contextRef.current;
    if (item) {
      const { type, cell } = item
      let color = cell.time.color;
      if (type === "destroy") {
        // messageSet(`销毁,${cell.coords}`)
        color = "#fff";
      } else {
        // messageSet(`绘制,${cell.coords}`)
      }
      const [x, y] = cell.coords;
      ctx.fillStyle = color;
      ctx.fillRect(x * 5, y * 5, 5, 5);
    }
  };
  useEffect(() => {
    contextRef.current = refCanvas.current.getContext("2d")
    let item = scene.pop()
    while (item) {
      draw(item);
      item = scene.pop()
    }
  }, []);
  const clearAll = () => {
    let item = scene.pop()
    while (item) {
      draw(item)
      item = scene.pop()
    }
  }
  const next = () => {
    time.next()
    // aliveCellSet(scene.count)
    // lifeTimeSet((state) => {
    //   return state + 1
    // })
  }

  const onClick = (event: any) => {
    const item = scene.pop()
    if (item) {
      draw(item);
    } else {
      if (event) {
        next()
        onClick(true)
      }
    }
  };

  const autoStep = () => {
    const run = () => {
      const item = scene.pop()
      if (item) {
        draw(item)
      } else {
        clearInterval(timeRef.current)
        timeRef.current = 0
      }
    }
    clearAll()
    if (timeRef.current) {
      clearInterval(timeRef.current)
      timeRef.current = 0
    } else {
      next()
      timeRef.current = setInterval(run, 60);
    }
  };
  const autoTime = () => {
    const run = () => {
      next()
      let item = scene.pop()
      while (item) {
        draw(item)
        item = scene.pop()
      }
      if (timeRef.current) {
        setTimeout(run)
        // requestAnimationFrame(run)
      }
    }
    clearAll()
    if (timeRef.current) {
      timeRef.current = 0
    } else {
      timeRef.current = 1
      run()
    }
  }
  return (
    <div className="App">
      <div>
        <button onClick={onClick}>下一步</button>
        <button onClick={autoStep}>按步骤演化演化</button>
        <button onClick={autoTime}>按时间周期演化</button>
      </div>
      {/* <div>操作:{`${message}`}</div>
      <div>{`当前在第${lifeTime}个时间周期;当前存活的细胞${aliveCell}`}</div> */}
      <canvas ref={refCanvas} width="5000" height="5000"></canvas>
    </div>
  );
}

export default App;
