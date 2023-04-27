import { Resizable, Size, Enable, ResizableProps as ResizableProperties } from "re-resizable";
import { useEffect, useState } from "react";

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}


const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
} as const;

const enable: Enable = {
  top:false,
  right:true, 
  bottom:false, 
  left:false, 
  topRight:false, 
  bottomRight:false, 
  bottomLeft:false, 
  topLeft:false
}



const ResizableBox: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableProperties;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

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

  if (direction === 'horizontal'){
    resizableProps = {
      className: 'resize-horizontal',
      maxWidth: innerWidth * 0.975,
      maxHeight: Infinity,
      size: {
        height: Infinity,
        width
      },
      onResizeStop: (event, direction, refToElement, delta) => {
        setWidth(refToElement.offsetWidth);
      }
    };
  } else {
    resizableProps = {
      maxWidth: Infinity,
      maxHeight: innerHeight * 0.975,
      size: {
        height: 300,
        width
      }
    };
  }
  
  return (
  <Resizable {...resizableProps}>
    {children}
  </Resizable>
  );

};

export default ResizableBox;