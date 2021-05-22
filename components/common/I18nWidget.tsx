import Link from 'next/link';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';

interface LOCALE_DATA {
  name: string;
  img: {
    filename: string;
    alt: string;
  };
}

const LOCALES_MAP: Record<string, LOCALE_DATA> = {
  es: {
    name: 'Español',
    img: {
      filename: 'flag-es.svg',
      alt: 'Bandera Colombiana',
    },
  },
  'en-US': {
    name: 'English',
    img: {
      filename: 'flag-en-us.svg',
      alt: 'US Flag',
    },
  },
};

const I18nWidget: FC = () => {
  const [display, setDisplay] = useState(false);
  const {
    locale,
    locales,
    defaultLocale = 'en-US',
    asPath: currentPath,
  } = useRouter();

  const options = locales?.filter((val) => val !== locale);
  const currentLocale = locale || defaultLocale;

  return (
    <nav>
      <div
        className="flex items-center relative"
        onClick={() => setDisplay(!display)}
      >
        <button aria-label="Language selector">
          <img
            width="20"
            height="20"
            className="block mr-2 w-5"
            src={`/${LOCALES_MAP[currentLocale].img.filename}`}
            alt={LOCALES_MAP[currentLocale].img.alt}
          />
          {options && <span className="cursor-pointer">^</span>}
        </button>
      </div>
      <div className="absolute top-0 right-0">
        {options?.length && display ? (
          <div>
            <div className="flex flex-row justify-end px-6">
              <button
                onClick={() => setDisplay(false)}
                aria-label="Close panel"
              >
                X
              </button>
            </div>
            <ul>
              {options.map((locale) => (
                <li key={locale}>
                  <Link href={currentPath} locale={locale}>
                    <a onClick={() => setDisplay(false)}>
                      {LOCALES_MAP[locale].name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default I18nWidget;
