import React, { JSX } from 'react'
import { ComponentProps } from 'lib/component-props';
import HomeHighlighted from './HighlightedArticles';

export type ArticleRecommenderProps = ComponentProps & {
  params: { [key: string]: string };
}

const ArticleRecommender = (props: ArticleRecommenderProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const rfkId = props.params['RFKID'];

  if (rfkId === "") {
    return (
      <div className={`${sxaStyles}`}>
        RFK ID is not set.
      </div>
    )
  }

  return (
    <div className={`${sxaStyles}`}>
      <HomeHighlighted rfkId="search_home_highlighted_articles_gridwell" />
    </div>
  )
}

export const Default = ArticleRecommender;
