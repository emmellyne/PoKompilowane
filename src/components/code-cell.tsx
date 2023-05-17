import { Resizable, Size, Enable, ResizableProps as ResizableProperties } from "re-resizable";
import { useEffect, useState } from "react";
import CodeEditor from './code-editor';
import Preview from './preview';
import { theme } from "./res/colors";
import './code-cell.css';
import { Cell } from '../state';
import { useActions } from "../hooks/use-actions";
import { usedTypedSelector } from "../hooks/use-type-selector";
import { useCumulativeCode } from "../hooks/use-cumulative-code";

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

  const {updateCell, createBundle} = useActions();
  const bundle = usedTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);
  

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 750);

    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-nex-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle]);

  const resizableProps_horizontal: ResizableProperties = {
    className: 'resize-horizontal',
    maxWidth: innerWidth,
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
      width: '100%'
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
    <div className="progress-wrapper">
    {
      !bundle || bundle.loading
      ? (
          <div className="progress-cover">
            <progress className="progress is-small is-primary" max="100">
              Loading
            </progress>
          </div>
      ) : (
      <Preview code={bundle.code} err={bundle.err} />
    )}
    </div>
  </Resizable>
  );

};

export default CodeCell;