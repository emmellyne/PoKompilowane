import { Resizable, Size, Enable, ResizableProps as ResizableProperties } from "re-resizable";
import { useEffect, useState } from "react";
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import { theme } from "./res/colors";
import './code-cell.css';
import { Cell } from '../state';
import { useActions } from "../hooks/use-actions";

// interface CodeCellProps {
//   cell: Cell
// }

interface ResizableProps {
  cell : Cell
  children?: React.ReactNode;
}


const enable_horizontal: Enable = {
  top:false,
  right:true, 
  bottom:false, 
  left:false, 
  topRight:false, 
  bottomRight:false, 
  bottomLeft:false, 
  topLeft:false
}

const enable_vertical: Enable = {
  top:false,
  right:false, 
  bottom:true, 
  left:false, 
  topRight:false, 
  bottomRight:false, 
  bottomLeft:false, 
  topLeft:false
}





const CodeCell: React.FC<ResizableProps> = ({ cell, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.7);
  const [height, setHeight] = useState(window.innerHeight * 0.2);
  
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const {updateCell} = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [cell.content]);

  const resizableProps_horizontal: ResizableProperties = {
    className: 'resize-horizontal',
    maxWidth: innerWidth * 0.975,
    maxHeight: Infinity,
    size: {
      height,
      width
      },
    onResizeStop: (event, direction, refToElement, delta) => {
      setWidth(refToElement.offsetWidth);
    },
    enable: enable_horizontal,
    handleClasses: {right: "handle-horizontal"}
  } 
  
  const resizableProps_vertical: ResizableProperties = {
    className: "resize-vertical",
    maxWidth: Infinity,
    maxHeight: innerHeight * 0.975,
    minHeight: 25,
    size: {
      height,
      width: innerWidth
      },
    onResize: (event, direction, refToElement, delta) => {
      setHeight(refToElement.offsetHeight);
    },
    enable: enable_vertical,
    handleClasses: {bottom: "handle-vertical"},
    handleWrapperClass: "handle-wrapper-vertical"
  } 

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        };
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };

  }, []);
  
  return (
  <Resizable {...resizableProps_vertical}>
    <Resizable {...resizableProps_horizontal}>
      <CodeEditor 
                initialValue={cell.content}
                onChange={(value) => updateCell(cell.id, value)}/>

    </Resizable>
    <Preview code={code} err={err} />
  </Resizable>
  );

};

export default CodeCell;