const Logo = ({ colorProps }) => {
    let color = colorProps || "red";
    let ratio = 508/362;
    return <>
        <svg height="40" viewBox="0 0 508 362" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56.94 2.86002C67.3467 29.5267 77.7867 56.1567 88.26 82.75C95.9 102.163 103.55 121.57 111.21 140.97C119.303 161.543 127.38 182.13 135.44 202.73C135.69 203.38 136.01 204.01 136.5 205.11C137.87 201.81 139.1 198.89 140.29 195.96C148.657 175.433 157.023 154.903 165.39 134.37C169.65 123.92 173.93 113.48 178.13 103.01C178.409 102.234 178.409 101.386 178.13 100.61C170.423 81.5767 162.687 62.56 154.92 43.56C149.3 29.76 143.687 15.9634 138.08 2.17002C137.94 1.82002 137.83 1.46002 137.59 0.790015H139.87C157.02 0.790015 174.17 0.790015 191.32 0.790015C192.011 0.685669 192.716 0.844591 193.296 1.23533C193.876 1.62607 194.287 2.22015 194.45 2.90002C204.657 29.0467 214.907 55.1867 225.2 81.32C233.453 102.32 241.713 123.32 249.98 144.32C257.62 163.733 265.253 183.147 272.88 202.56C273.19 203.33 273.52 204.1 274.06 205.4C275.26 202.49 276.28 200.04 277.27 197.58C289.623 167.047 301.957 136.517 314.27 105.99C317.89 97.05 321.483 88.1 325.05 79.14C325.502 77.9895 325.739 76.766 325.75 75.53C325.75 51.2967 325.75 27.06 325.75 2.82001V0.210013C326.45 0.210013 327.07 0.120017 327.7 0.120017C352.53 0.120017 377.37 -0.0999835 402.21 0.260017C419.64 0.510017 436.76 3.19002 452.88 10.34C465.04 15.73 475.42 23.34 481.88 35.34C493.18 56.34 491.98 84.27 471.36 103.58C458.45 115.66 442.94 122.4 425.94 126.21C425.12 126.39 424.31 126.64 423.5 126.88C423.42 126.88 423.38 127.1 423.19 127.51C425.64 127.9 428.02 128.25 430.39 128.65C446.27 131.37 461.64 135.65 475.61 143.99C488.87 151.87 499.07 162.58 503.61 177.52C509.61 197.24 508.79 216.59 497.92 234.7C491.92 244.78 482.92 251.79 472.64 257.22C460.91 263.43 448.27 266.87 435.31 269.27C423.355 271.386 411.25 272.543 399.11 272.73C396.66 272.79 396.66 272.82 396.88 271.03C401.73 270.18 406.6 269.51 411.38 268.44C419.727 266.757 427.588 263.216 434.38 258.08C443.44 251.02 448.98 241.63 451.84 230.68C456.236 214.507 456.903 197.548 453.79 181.08C449.51 159.03 437.04 143.26 416.14 134.46C408.91 131.46 401.53 128.94 393.62 128.46C393.52 128.46 393.44 128.32 393.1 128.03C393.84 127.84 394.41 127.67 394.99 127.54C402.44 125.81 409.75 123.71 416.17 119.35C425.04 113.35 430.9 104.9 435.04 95.16C440.35 82.66 441.55 69.56 440.7 56.16C440.12 47.16 438.88 38.27 435.58 29.78C429.66 14.59 418.58 5.72002 402.58 2.87002C399.482 2.33035 396.345 2.04938 393.2 2.03002C382.2 1.93002 371.25 2.03001 360.28 1.96001C359.71 1.88295 359.132 2.01748 358.655 2.33814C358.177 2.6588 357.834 3.14334 357.69 3.70002C345.63 33.64 333.547 63.5667 321.44 93.48C311.607 117.813 301.77 142.147 291.93 166.48C280.923 193.733 269.923 220.99 258.93 248.25C256.16 255.12 253.37 261.99 250.5 268.82C249.815 270.112 249.015 271.34 248.11 272.49L179.77 104.54L111.28 272.27H110.56C73.7533 181.85 36.9 91.3367 0 0.730018" fill={color} />
            <path d="M62.7699 338.73C64.5299 343.88 66.1999 349.05 67.8999 354.21C68.1399 354.95 68.4299 355.67 68.8999 356.83L77.3599 336.18L85.9499 356.85C87.4399 352.24 88.7399 348.2 90.0399 344.16C90.6499 342.29 91.1899 340.4 91.8799 338.56C92.0699 338.05 92.7199 337.71 93.1599 337.3L93.6699 337.72L86.0499 361.1L77.2699 340.1C74.3399 347.25 71.5799 353.94 68.5999 361.21L60.9299 337.73" fill={color} />
            <path d="M287.77 348.04C290.69 349.27 292.24 351.32 291.96 354.5C291.68 357.68 289.33 359.98 285.77 360.22C283.872 360.33 281.968 360.33 280.07 360.22C279.6 360.22 278.77 359.59 278.77 359.22C278.69 352.02 278.71 344.82 278.71 337.46C280.992 337.329 283.28 337.349 285.56 337.52C289.43 338.04 291.37 343.52 288.93 346.74C288.566 347.193 288.179 347.627 287.77 348.04V348.04ZM280.16 358.8H284.16C284.878 358.813 285.597 358.777 286.31 358.69C287.456 358.528 288.506 357.963 289.272 357.096C290.039 356.229 290.47 355.117 290.49 353.96C290.542 352.795 290.134 351.657 289.354 350.791C288.573 349.924 287.484 349.4 286.32 349.33C284.693 349.15 283.055 349.1 281.42 349.18C280.99 349.18 280.24 349.85 280.23 350.18C280.09 352.97 280.13 355.73 280.13 358.8H280.16ZM280.16 347.69C281.78 347.69 283.03 347.78 284.26 347.69C285.333 347.698 286.365 347.282 287.133 346.533C287.901 345.784 288.342 344.763 288.36 343.69C288.46 342.03 288.19 340.22 286.56 339.69C284.626 339.209 282.643 338.951 280.65 338.92C280.51 338.92 280.19 339.4 280.19 339.66C280.13 342.25 280.14 344.86 280.14 347.73L280.16 347.69Z" fill={color} />
            <path d="M210.67 337.56C213.35 337.56 215.76 337.26 218.05 337.63C223.46 338.5 226.99 343.29 226.9 349.18C226.936 351.798 226.022 354.34 224.326 356.335C222.631 358.33 220.27 359.643 217.68 360.03C215.728 360.247 213.761 360.304 211.8 360.2C211.41 360.2 210.72 359.58 210.72 359.2C210.65 352.05 210.67 344.85 210.67 337.56ZM212.26 358.66C217.26 359.21 221.42 358.43 224.04 353.88C225.017 352.121 225.469 350.118 225.342 348.109C225.214 346.101 224.512 344.171 223.32 342.55C221.996 340.982 220.252 339.824 218.294 339.211C216.335 338.598 214.242 338.556 212.26 339.09V358.66Z" fill={color} />
            <path d="M143.12 349.67C143.12 352.6 143.12 355.54 143.12 358.46C142.976 359.074 142.729 359.659 142.39 360.19C142.05 359.651 141.813 359.055 141.69 358.43C141.69 352.01 141.69 345.58 141.69 339.16C141.69 338.65 141.76 338.16 141.81 337.51C143.722 337.396 145.64 337.413 147.55 337.56C150.31 337.93 152.04 340.22 152.15 343.12C152.27 346.23 150.74 348.42 147.91 349.17C147.3 349.33 146.67 349.4 145.74 349.56L152.77 359.83L152.32 360.37C151.692 360.064 151.118 359.659 150.62 359.17C148.73 356.58 146.94 353.91 145.11 351.28C144.67 350.66 144.2 350.07 143.74 349.46L143.12 349.67ZM143.12 343.29C143.12 344.47 143.05 345.65 143.12 346.82C143.12 347.23 143.56 347.91 143.85 347.94C145.85 348.12 147.85 348.13 149.31 346.5C149.907 345.885 150.313 345.109 150.478 344.268C150.643 343.427 150.56 342.555 150.24 341.76C149.54 339.76 147.95 339.04 146.01 338.81C143.25 338.5 143.08 338.63 143.08 341.33L143.12 343.29Z" fill={color} />
            <path d="M347.77 359.9L357.04 337.15H357.52C360.593 344.697 363.657 352.243 366.71 359.79L366.31 360.28C365.82 359.89 365.11 359.61 364.87 359.1C364.05 357.39 363.47 355.57 362.64 353.86C362.469 353.592 362.242 353.363 361.974 353.191C361.707 353.018 361.405 352.905 361.09 352.86C358.543 352.76 355.987 352.76 353.42 352.86C353.104 352.903 352.802 353.015 352.534 353.188C352.266 353.361 352.04 353.59 351.87 353.86C351.04 355.56 350.44 357.38 349.64 359.09C349.4 359.61 348.78 359.94 348.33 360.36L347.77 359.9ZM357.56 341.16H357.02C355.67 344.48 354.33 347.81 352.96 351.16H361.57L357.56 341.16Z" fill={color} />
            <path d="M404.14 337.62C404.14 343.12 404.3 348.62 404.08 354.11C403.93 357.94 400.65 360.52 396.51 360.6C392.37 360.68 389.04 358.2 388.81 354.52C388.48 349.16 388.62 343.78 388.62 338.4C388.62 338.03 389.22 337.65 389.54 337.28L390.07 337.56C390.07 342 390.07 346.45 390.07 350.89C390.066 352.136 390.163 353.38 390.36 354.61C390.83 357.3 392.93 358.92 396.01 359.1C399.09 359.28 401.59 357.73 402.27 355.1C402.534 353.952 402.658 352.777 402.64 351.6C402.64 347.4 402.64 343.21 402.69 339.01C402.817 338.391 403.051 337.799 403.38 337.26L404.14 337.62Z" fill={color} />
            <path d="M315.44 337.52H325.91L326.21 338.05C325.76 338.28 325.32 338.71 324.86 338.73C322.86 338.8 320.93 338.73 318.96 338.73C318.26 338.73 317.55 338.8 316.76 338.84V346.94C319.32 346.94 321.85 346.94 324.38 346.94C324.944 347.061 325.483 347.281 325.97 347.59C325.42 347.86 324.88 348.35 324.32 348.37C321.85 348.46 319.38 348.37 316.78 348.37V358.69C319.16 358.69 321.49 358.63 323.78 358.69C324.567 358.825 325.332 359.071 326.05 359.42C325.292 359.73 324.5 359.948 323.69 360.07C321.33 360.16 318.96 360.07 316.6 360.07C315.7 360.07 315.09 359.93 315.1 358.81C315.1 351.81 315.1 344.81 315.17 337.81C315.21 337.85 315.33 337.73 315.44 337.52Z" fill={color} />
            <path d="M177.56 348.48V358.8C180.19 358.8 182.73 358.8 185.27 358.8C185.785 358.911 186.277 359.114 186.72 359.4C186.24 359.67 185.72 360.18 185.27 360.19C182.21 360.26 179.14 360.19 175.97 360.19V337.42C179.29 337.42 182.56 337.42 185.82 337.42C186.12 337.42 186.41 337.87 186.71 338.12C186.36 338.32 186.01 338.69 185.65 338.7C183.65 338.76 181.71 338.7 179.74 338.7H177.55V346.92C180.01 346.92 182.47 346.92 184.93 346.92C185.48 346.92 186.01 347.43 186.54 347.71C186.06 348.009 185.532 348.226 184.98 348.35C182.56 348.52 180.14 348.48 177.56 348.48Z" fill={color} />
            <path d="M497.37 0.0599487C498.65 0.0445072 499.92 0.288281 501.104 0.776608C502.288 1.26494 503.36 1.98771 504.257 2.90143C505.154 3.81514 505.857 4.90089 506.323 6.09332C506.789 7.28575 507.009 8.5602 506.97 9.83995C506.969 11.105 506.718 12.3573 506.232 13.5252C505.746 14.6932 505.035 15.7538 504.138 16.6465C503.242 17.5391 502.178 18.2462 501.008 18.7272C499.838 19.2083 498.585 19.4539 497.32 19.4499C494.734 19.4421 492.255 18.4133 490.424 16.5874C488.592 14.7614 487.556 12.2861 487.54 9.69995C487.549 8.42055 487.811 7.15558 488.311 5.97772C488.81 4.79986 489.538 3.73235 490.451 2.83653C491.365 1.94071 492.446 1.23425 493.633 0.757748C494.821 0.28125 496.091 0.0441045 497.37 0.0599487V0.0599487ZM497.37 18.1699C498.48 18.1601 499.577 17.9318 500.598 17.498C501.619 17.0643 502.545 16.4336 503.323 15.642C504.101 14.8503 504.715 13.9133 505.13 12.8843C505.546 11.8554 505.755 10.7546 505.745 9.64494C505.735 8.53527 505.507 7.43841 505.073 6.41697C504.639 5.39554 504.009 4.46955 503.217 3.69186C502.425 2.91417 501.488 2.30001 500.459 1.88446C499.43 1.4689 498.33 1.26009 497.22 1.26994C494.979 1.28983 492.838 2.19918 491.267 3.79792C489.696 5.39667 488.825 7.55387 488.845 9.79495C488.865 12.036 489.774 14.1774 491.373 15.748C492.972 17.3186 495.129 18.1898 497.37 18.1699Z" fill={color} />
            <path d="M459.65 337.13C460.333 337.605 460.948 338.17 461.48 338.81C463.41 341.99 465.25 345.23 467.33 348.81C469.41 345.25 471.33 342.01 473.2 338.75C473.71 337.87 474.2 337.01 475.58 337.66C473.49 341.26 471.46 344.84 469.31 348.35C468.393 349.784 467.952 351.471 468.05 353.17C468.16 355.07 468.12 356.98 468.05 358.88C468.05 359.33 467.58 359.76 467.33 360.19C467.08 359.74 466.66 359.29 466.63 358.82C466.5 357.253 466.5 355.677 466.63 354.11C466.811 351.614 466.103 349.134 464.63 347.11C462.72 344.11 460.98 340.91 459.17 337.79L459.65 337.13Z" fill={color} />
            <path d="M433.33 338.73V360.06C431.57 360.47 431.85 359.3 431.85 358.45C431.85 352.68 431.85 346.91 431.85 341.14V339.09C429.93 338.09 427.67 339.55 425.56 337.77C426.113 337.602 426.678 337.475 427.25 337.39C430.79 337.39 434.33 337.39 437.87 337.39C438.376 337.498 438.857 337.698 439.29 337.98C438.84 338.22 438.4 338.65 437.94 338.68C436.5 338.82 435.07 338.73 433.33 338.73Z" fill={color} />
            <path d="M117.3 348.9C117.3 352.17 117.3 355.45 117.3 358.73C117.196 359.245 117 359.736 116.72 360.18C116.44 359.71 115.91 359.18 115.9 358.75C115.853 352.13 115.853 345.51 115.9 338.89C115.9 338.41 116.42 337.89 116.7 337.45C116.983 337.884 117.187 338.365 117.3 338.87C117.32 342.21 117.3 345.55 117.3 348.9Z" fill={color} />
            <path d="M499.12 10.55C500.07 12.05 500.96 13.47 501.85 14.89L501.49 15.39C500.919 15.1087 500.39 14.7485 499.92 14.32C499.292 13.5607 498.764 12.7239 498.35 11.83C497.68 10.36 496.63 9.99997 494.94 10.57V15.12L494.36 15.27C494.105 14.8895 493.922 14.466 493.82 14.02C493.82 11.33 493.82 8.62998 493.82 5.93998C493.82 4.93998 494.21 4.52998 495.21 4.57998C496.59 4.64998 497.97 4.57998 499.35 4.68998C500.73 4.79998 502.07 5.36998 502.25 7.04998C502.319 7.40859 502.314 7.77737 502.237 8.13421C502.159 8.49105 502.011 8.82858 501.8 9.12652C501.588 9.42446 501.319 9.67667 501.008 9.86801C500.697 10.0593 500.351 10.1859 499.99 10.24C499.77 10.3 499.49 10.41 499.12 10.55ZM497.29 9.03997C497.729 9.06567 498.17 9.06567 498.61 9.03997C499.61 8.90997 501.01 8.84997 500.76 7.42997C500.65 6.80997 499.47 6.26997 498.68 5.92997C498.12 5.69997 497.38 5.92998 496.73 5.85998C495.15 5.64998 494.86 6.44998 494.94 7.85998C495.05 9.80998 496.56 8.72997 497.29 9.03997Z" fill={color} />
        </svg>
    </>
}
export default Logo;