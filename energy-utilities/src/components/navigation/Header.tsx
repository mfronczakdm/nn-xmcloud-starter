import React, { JSX, useState } from "react"
import Link from "next/link"
import { Zap } from "lucide-react"
import { ComponentProps } from 'lib/component-props';
import { withDatasourceCheck } from "@sitecore-content-sdk/nextjs"
import PreviewSearch from "../search/PreviewSearch"

export type HeaderProps = ComponentProps & {
  fields: {
    items: [{
      displayName: string;
      fields: {
        Link: {
          value: {
            anchor: string;
            href: string;
            linktype: string;
            target: string;
            text: string;
          };
        };
      };
    }];
  };
};

export const Header = (props: HeaderProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className={`sticky z-10 top-0 left-0 ${sxaStyles}`}>
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 mr-10">
                <Zap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">Gridwell</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {props.fields?.items?.map((item, index) => (
                <Link key={index} href={item.fields?.Link?.value?.href ?? '#'} prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium">
                  {item.displayName}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <PreviewSearch rfkId="rfkid_6" isOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export const Default = withDatasourceCheck()<HeaderProps>(Header);