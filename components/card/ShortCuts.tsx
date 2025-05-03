export default function ShortCuts() {
  return (
    <div className="w-full max-w-lg rounded-md p-6 mb-10">
      <div className="grid grid-cols-6 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
                <GoogleIcon />
              </div>
              <span className="text-xs text-black">Google</span>
            </div>
          ))}
      </div>
    </div>
  );
}

// 這個 GoogleIcon 函數返回一個 SVG 圖標，
function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M22.5008 12.2614C22.5008 11.4459 22.4304 10.6618 22.3008 9.90909H12V14.3575H17.8754C17.64 15.795 16.8863 17.013 15.6863 17.8286V20.7139H19.3446C21.4059 18.8123 22.5008 15.8393 22.5008 12.2614Z"
        fill="#4285F4"
      />
      <path
        d="M12 23.0001C14.97 23.0001 17.4329 22.0114 19.3446 20.7137L15.6863 17.8285C14.7054 18.4775 13.4592 18.8569 12 18.8569C9.13542 18.8569 6.70833 16.8946 5.84583 14.2728H2.06458V17.2524C3.96458 20.6946 7.69792 23.0001 12 23.0001Z"
        fill="#34A853"
      />
      <path
        d="M5.84583 14.2727C5.62917 13.6237 5.50833 12.9273 5.50833 12.2C5.50833 11.4727 5.62917 10.7763 5.84583 10.1273V7.14771H2.06458C1.3875 8.70316 1 10.4046 1 12.2C1 13.9955 1.3875 15.6969 2.06458 17.2523L5.84583 14.2727Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.54319C13.6208 5.54319 15.0742 6.0455 16.2179 7.13641L19.4742 3.88C17.4296 1.9741 14.9667 0.800049 12 0.800049C7.69792 0.800049 3.96458 3.10552 2.06458 6.54774L5.84583 9.52729C6.70833 6.90547 9.13542 5.54319 12 5.54319Z"
        fill="#EA4335"
      />
    </svg>
  );
}
