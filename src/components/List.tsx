import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
type ListType = {
    content: any[];
}
export default function List({content}:ListType) {
  const [OperativeContent, setOperativeContent] = useState(content);
  const [draggingElement, setDraggingdElement] = useState<any>(null);
  const [target, setTarget] = useState<any>(null);

  useEffect(() => {
    if (draggingElement != null) {
      console.log("draggingElement:", draggingElement);
    }
  }, [draggingElement]);
  useEffect(() => {
    if (target != null) {
      console.log("target:", target);
    }
  }, [target]);

  const listRef = useRef<HTMLUListElement>(null);

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dragStart = (e: React.DragEvent) => {
    setDraggingdElement(e.currentTarget.id);
    const arrChildren = Array.from(listRef.current!.children).filter(
      (item) => item.id !== e.currentTarget.id
    );
    arrChildren.forEach((item) => {
      item.classList.add(style.hint);
    });
    e.currentTarget.setAttribute("position", "absolute");
  };

  const drop = (e: React.DragEvent) => {
    const arrChildren = Array.from(listRef.current!.children);
    arrChildren.forEach((item) => {
      item.classList.remove(style.hint);
      if (item.classList.contains(style.active)) {
        item.classList.remove(style.active);
      }
    });

    console.log("droped at ", e.currentTarget.id);
    let newArr = [...OperativeContent];

    let currentPos = parseInt(draggingElement),
      droppedPos = parseInt(e.currentTarget.id);
    if (currentPos < droppedPos) {
      const head = newArr.slice(0, currentPos);
      const tail = newArr.slice(droppedPos + 1);
      let workinArr = newArr.slice(currentPos, droppedPos + 1);
      const temp = workinArr[0];
      workinArr = workinArr.slice(1);
      workinArr.push(temp);
      head.push(...workinArr);
      head.push(...tail);
      setOperativeContent(head)

    }else if (currentPos > droppedPos){
        const head = newArr.slice(0, droppedPos);
        const tail = newArr.slice(currentPos+1, newArr.length);
        let workinArr = newArr.slice( droppedPos ,currentPos+1);
        const temp = workinArr[0];
        workinArr = workinArr.slice(1);
        workinArr.push(temp);
        head.push(...workinArr);
        head.push(...tail);
        setOperativeContent(head)
    }
    setDraggingdElement(null);
  };

  const dragEnter = (e: React.DragEvent) => {
    e.currentTarget.classList.add(style.active);
    setTarget(e.currentTarget.id);
  };

  const dragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove(style.active);
  };

  return (
    <ul
      ref={listRef}
      style={{
        width: 300,
        // border: "solid black 2px",
        // padding: 10,
        listStyle: "none",
        gap: 8,
      }}
    >
      {OperativeContent.map((item, index) => (
        <li
          onDragLeave={(e) => dragLeave(e)}
          onDragEnter={(e) => dragEnter(e)}
          onDrop={(e) => drop(e)}
          onDragOver={(e) => dragOver(e)}
          className={style.listItem}
          key={index}
          draggable={true}
          id={index.toString()}
          onDragStart={(e) => dragStart(e)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
