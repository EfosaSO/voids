import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export default function Leaflet({
  setShow,
  children,
  loading,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  loading?: boolean;
}) {
  const leafletRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const transitionProps = { type: "spring", stiffness: 500, damping: 30 };
  useEffect(() => {
    controls.start({
      y: 20,
      transition: transitionProps,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDragEnd(_: any, info: any) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    const height = leafletRef.current?.getBoundingClientRect().height || 0;
    if (!loading && (offset > height / 2 || velocity > 800)) {
      await controls.start({ y: "100%", transition: transitionProps });
      setShow(false);
    } else {
      controls.start({ y: 0, transition: transitionProps });
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={leafletRef}
        key="leaflet"
        className="group fixed inset-x-0 bottom-0 z-[99999] w-screen cursor-grab bg-[color:var(--background)] pb-5 active:cursor-grabbing sm:hidden rounded-tl-lg rounded-tr-lg overflow-hidden"
        initial={{ y: "100%" }}
        animate={controls}
        exit={{ y: "100%" }}
        transition={transitionProps}
        drag="y"
        dragDirectionLock
        onDragEnd={handleDragEnd}
        dragElastic={{ top: 0, bottom: 1 }}
        dragConstraints={{ top: 0, bottom: 0 }}
      >
        <div
          className={`rounded-t-4xl -mb-1 flex h-7 w-full items-center justify-center`}
        >
          <div className="-mr-1 h-1 w-6 rounded-full bg-[color:var(--background-hover)] transition-all group-active:rotate-12" />
          <div className="h-1 w-6 rounded-full bg-[color:var(--background-hover)] transition-all group-active:-rotate-12" />
        </div>
        {children}
      </motion.div>
      <motion.div
        key="leaflet-backdrop"
        className="fixed inset-0 z-[9999] bg-black bg-opacity-40 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          if (!loading) {
            setShow(false);
          }
        }}
      />
    </AnimatePresence>
  );
}
