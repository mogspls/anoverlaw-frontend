// All icons are from https://friconix.com

interface SVG {
  fill?: string;
  className?: string;
  size?: string;
}

function Phone({ fill, className, size }: SVG) {
  return (
    <svg
      width={size ? size : "24"}
      height={size ? size : "24"}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className={className}
    >
      <path
        d=" M 640 179C 640 179 640 179 640 179C 662 156 692 140 724 139C 763 140 796 169 823 195C 853 222 865 262 859 301C 847 538 676 751 455 830C 391 851 323 870 254 861C 206 844 160 809 137 763C 129 729 145 692 169 668C 210 642 258 633 303 617C 355 600 404 631 446 658C 481 651 512 619 541 595C 590 550 632 495 657 431C 623 412 587 373 597 334C 605 281 614 226 640 179"
        transform="rotate(90,500,500)"
      />
    </svg>
  );
}

function Search({ fill, className, size }: SVG) {
  return (
    <svg
      width={size ? size : "24"}
      height={size ? size : "24"}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className={className}
    >
      <path
        d=" M 601 199C 601 199 601 199 601 199C 491 199 401 289 401 399C 401 452 422 503 460 540C 497 578 548 599 601 599C 711 599 801 509 801 399C 801 289 711 199 601 199M 601 99C 601 99 601 99 601 99C 767 99 901 233 901 399C 901 479 869 555 813 611C 757 667 681 699 601 699C 534 699 468 676 416 634C 416 634 211 839 211 839C 201 849 176 850 166 840C 166 840 136 809 136 809C 126 799 126 774 136 764C 136 764 345 555 345 555C 316 508 301 454 301 399C 301 319 333 243 389 187C 445 131 521 99 601 99"
        transform="translate(1000,0) scale(-1,1)"
      />
    </svg>
  );
}

function ChevronWide({ fill, className, size }: SVG) {
  return (
    <svg
      width={size ? size : "24"}
      height={size ? size : "24"}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className={className}
    >
      <path
        d=" M 528 272C 528 272 828 572 828 572C 843 587 843 611 828 626C 813 641 789 640 775 625C 775 625 501 352 501 352C 501 352 228 625 228 625C 213 640 189 641 174 626C 160 611 160 587 175 572C 175 572 475 272 475 272C 482 265 491 262 501 261C 511 261 521 265 528 272C 528 272 528 272 528 272"
        transform="rotate(180,500,500)"
      />
    </svg>
  );
}

function Map({ fill, className, size }: SVG) {
  return (
    <svg
      width={size ? size : "24"}
      height={size ? size : "24"}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className={className}
    >
      <path d=" M 500 88C 564 88 628 108 680 144C 794 222 843 379 794 507C 744 612 693 716 643 821C 617 870 601 930 548 957C 494 988 426 956 398 904C 340 788 285 670 228 553C 187 480 176 390 201 309C 237 182 362 88 494 88C 496 88 498 88 500 88C 500 88 500 88 500 88M 387 400C 387 462 438 512 500 512C 562 512 613 462 613 400C 613 338 562 287 500 287C 438 287 387 338 387 400C 387 400 387 400 387 400" />
    </svg>
  );
}

function TimesIcon({ fill, className, size }: SVG) {
  return (
    <svg
      width={size ? size : "24"}
      height={size ? size : "24"}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={fill}
    >
      <path d="M 75 0C 75 0 75 0 75 0C 33 0 0 33 0 75C 0 75 0 925 0 925C 0 967 33 1000 75 1000C 75 1000 925 1000 925 1000C 967 1000 1000 967 1000 925C 1000 925 1000 75 1000 75C 1000 33 967 0 925 0C 925 0 75 0 75 0 M 253 677C 242 666 242 652 253 641C 253 641 394 500 394 500C 394 500 253 359 253 359C 242 348 242 334 253 323C 253 323 323 253 323 253C 334 242 348 242 359 253C 359 253 500 394 500 394C 500 394 641 253 641 253C 652 242 666 242 677 253C 677 253 747 323 747 323C 758 334 758 348 747 359C 747 359 606 500 606 500C 606 500 747 641 747 641C 758 652 758 666 747 677C 747 677 677 747 677 747C 666 758 652 758 641 747C 641 747 500 606 500 606C 500 606 359 747 359 747C 348 758 334 758 323 747C 323 747 253 677 253 677" />
    </svg>
  );
}

export { Phone, Search, ChevronWide, Map, TimesIcon };
