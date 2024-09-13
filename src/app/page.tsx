"use client"
import { AnimatePresence, inView, motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";

import BackToUp from "@/assets/vectors/grommet-icons_link-up.svg"


interface Dimensions {
  width: number;
  height: number;
  elX: number;
  elY: number;
}

export default function Home() {


  // const { scrollYProgress } = useScroll();
  
  const [visible, setVisible] = useState(true); //for control navbar appearance
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0, elX: 0, elY: 0 });
  const [isInView, setIsInView] = useState<string>('')
  const [isVisible, setIsVisible] = useState<'hidden' | 'visible'>('hidden')


  const navigation = [
    {
      title: <BackToUp />,
      href: "#section1",
      id: 'service1'
    },
    {
      title: "section2",
      href: "#section2",
      id: 'service2'
    },
    {
      title: "section3",
      href: "#section3",
      id: "service3"
    },
    {
      title: "Footer",
      href: "#footer",
      id: 'footer'
    },

  ]

  const viewportMargin = "-20% 0px -20% 0px";
  const controls = useAnimation();

  inView(
    "#section1",
    () => { setIsInView('section1') },
    { margin: viewportMargin }
  )
  inView(
    "#section2",
    () => { setIsInView('section2') },
    { margin: viewportMargin }
  )
  inView(
    "#section3",
    () => { setIsInView('section3') },
    { margin: viewportMargin }
  )

  /**
   * make appear nav bar whe scrool start
  **/
  // useMotionValueEvent(scrollYProgress, "change", (current) => {
  //   if (typeof current === "number") {
  //     if (scrollYProgress.get() < 0.1) {
  //       setVisible(false);
  //     } else {
  //       setVisible(true);
  //     }
  //   }
  // });

  const ChangeActiveSection = (element: HTMLElement) => {
    const parentElement = element.parentElement;
    const id = element.id;
    const clickedElement = document.getElementById(id);
    const parentRect = parentElement?.parentElement?.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    if (clickedElement) {
      parentRect ?
        setDimensions({
          width: rect.width,
          height: rect.height,
          elX: (rect.left - parentRect.left),
          elY: (rect.top - parentRect.top),
        }) :
        setDimensions({
          width: rect.width,
          height: rect.height,
          elX: rect.left,
          elY: rect.top,
        })

        parentRect && console.log(rect.left, parentRect?.left, rect.left - parentRect?.left);
      console.log(parentElement);
    }
  }
  
  const handleLinkClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    ChangeActiveSection(element)
  };

  const handlePageScroll = (element: HTMLElement) => {
    ChangeActiveSection(element)
  }


  useEffect(() => {

    console.log(isInView);

    if (isInView === "") {
      controls.start({
        x: '0%',
        y: "0%",
        rotate: 0,
        transition: { duration: 0.5 }
      });
    } else {
      controls.start({
        x: '-5%',
        rotate: -15
      });
    }
  }, [isInView, controls]);


  useEffect(() => {
    dimensions.width === 0 ? setIsVisible('hidden') : setIsVisible('visible');
  }, [dimensions])


  useEffect(() => {
    console.log(isInView);
    const element = document.getElementById(`${isInView}_link`)
    element != null && handlePageScroll(element)
    // console.log(element);
    
  }, [isInView])




  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen  gap-[20vh] font-[family-name:var(--font-geist-sans)]">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 0,
            y: 0,
            scale: 0
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
            scale: 1
          }}
          transition={{
            duration: 0.4,
          }}
          className={cn(
            " max-w-fit fixed left-1/2 -translate-x-1/2 z-50 w-fit backdrop:blur-md bg-[#30303081] py-4 px-3 flex top-10 inset-x-0 mx-auto bg-opacity-70 backdrop-blur-md rounded-full  items-center justify-center space-x-4")} >
          <header >
            <nav className="flex items-center gap-3 sm:gap-5">
              <motion.div
                initial={{
                  width: `${dimensions.width + 32}px`,
                  height: `${dimensions.height + 16}px`,
                  top: `${dimensions.elY + 8}px`,
                  left: `${dimensions.elX - 4}px`,
                  visibility: `${isVisible}`,
                }}
                animate={{
                  width: `${dimensions.width + 32}px`,
                  height: `${dimensions.height + 16}px`,
                  top: `${dimensions.elY + 8}px`,
                  left: `${dimensions.elX - 4}px`,
                  visibility: `${isVisible}`,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                style={{
                  width: `${dimensions.width + 32}px`,
                  height: `${dimensions.height + 16}px`,
                  top: `${dimensions.elY + 8}px`,
                  left: `${dimensions.elX}px`,
                }}
                className={`fixed top-0 z-[-1] rounded-full bg-blue-500 `} />
              {
                navigation.map((item: any) => (
                  <Link
                    href={item?.href || ''}
                    key={item.title}
                    className="inline-flex items-center duration-300 h-fit text-white justify-center rounded-full  px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    <motion.div
                      onClick={handleLinkClick}
                      id={`${item.id}_link`}
                      className=' w-full flex  justify-center items-center flex-col '
                    >
                      {item.title}
                    </motion.div>
                  </Link>
                ))
              }
            </nav>
          </header>
        </motion.div>
      </AnimatePresence>

      <div id="section1" className=" rounded-[40px] mt-[10vh] relative bg-slate-400 block w-[80vw] h-[80vh]" />
      <div id="section2" className=" rounded-[40px] relative bg-red-300 block w-[80vw] h-[80vh]" />
      <div id="section3" className=" rounded-[40px] relative bg-green-300 block w-[80vw] h-[80vh]" />
      <footer id="footer" className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
