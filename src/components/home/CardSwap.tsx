import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    />
  )
);
Card.displayName = 'Card';

interface CardSwapProps {
  activeIndex: number;
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: React.ReactNode;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (
  el: HTMLElement,
  slot: ReturnType<typeof makeSlot>,
  skew: number
) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  activeIndex,
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}: CardSwapProps) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 1.6,
          durMove: 1.6,
          durReturn: 1.6,
          promoteOverlap: 0.85,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refs = useMemo(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>([]);
  const initialized = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize cards position on mount
  useEffect(() => {
    const total = refs.length;
    // Set initial order based on activeIndex
    const initialOrder = Array.from({ length: total }, (_, i) => (activeIndex + i) % total);
    order.current = initialOrder;

    refs.forEach((r, i) => {
      if (r.current) {
        const slotIdx = initialOrder.indexOf(i);
        placeNow(r.current, makeSlot(slotIdx, cardDistance, verticalDistance, total), skewAmount);
      }
    });
    initialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, skewAmount]);

  // Handle activeIndex changes
  useEffect(() => {
    if (!initialized.current) return;
    const total = refs.length;
    const prevFront = order.current[0];
    const newFront = activeIndex;

    if (prevFront === newFront || prevFront === undefined) return;

    // Kill any running timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }

    const newOrder = Array.from({ length: total }, (_, i) => (newFront + i) % total);
    const elPrevFront = refs[prevFront].current;
    if (!elPrevFront) return;

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Animate the previous front card dropping down
    tl.to(elPrevFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease,
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);

    // Animate all other cards to their new slot positions
    newOrder.forEach((idx, slotIndex) => {
      if (idx === prevFront) return;
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(slotIndex, cardDistance, verticalDistance, total);

      // Instantly set z-index at the promote moment
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      // Smoothly animate translation
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease,
        },
        `promote+=${slotIndex * 0.12}`
      );
    });

    // Send the previous front card to the back slot
    const backSlotIndex = total - 1;
    const backSlot = makeSlot(backSlotIndex, cardDistance, verticalDistance, total);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    
    tl.call(() => {
      gsap.set(elPrevFront, { zIndex: backSlot.zIndex });
    }, undefined, 'return');

    tl.to(
      elPrevFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease,
      },
      'return'
    );

    tl.call(() => {
      order.current = newOrder;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, cardDistance, verticalDistance, skewAmount]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as React.ReactElement<CardProps>, {
          key: i,
          ref: refs[i] as React.Ref<HTMLDivElement>,
          style: { width, height, ...((child.props as CardProps).style ?? {}) },
          onClick: (e: React.MouseEvent) => {
            (child.props as CardProps).onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
