import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'

import MarkdownParser from '__components/Markdown/MarkdownContent'

import Meta from '__components/Meta/Custom'
import ShareArticle from '__components/ShareBox'

import LayoutArticle from '__components/Layout/Default'
import PostTitle from '__components/PostDetail/Title'
import DateFormatter from '__components/Date'
import Tags from '__components/Tags'

import { getTilBySlug, getAllTils } from '__lib/tils'
import { SITE_METADATA } from '__lib/constants'
import CommentBox from '__components/CommentBox'

export default function TilDetail({ til, preview }) {
  const router = useRouter()
  if (!router.isFallback && !til?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <LayoutArticle preview={preview}>
        <>
          <Meta
            lang="id"
            title={`TIL: ${til.title} // mazipan.space`}
            description={til.excerpt}
            url={`${SITE_METADATA.url}/til/${til.slug}`}
            tag={`${til.tags[0]}`}
          />
          <Link as="/til" href="/til">
            <a aria-label="Previous page">
              <button className="relative bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
                &lt; Back to TIL
              </button>
            </a>
          </Link>

          <PostTitle>{til.title}</PostTitle>

          <div className="relative text-sm flex gap-2 justify-center md:justify-start">
            <div className="text-sm text-gray-600 dark:text-gray-200">
              <DateFormatter dateString={til.date} />
            </div>
            <Tags
              id="til-detail"
              tags={til.tags} />
          </div>

          <MarkdownParser content={til.content} />
          <div className='mt-8'>
            <ShareArticle text={til.title} url={`${SITE_METADATA.url}/til/${til.slug}`} />
          </div>
          <CommentBox />
        </>
      </LayoutArticle>
    </>
  )
}

export async function getStaticProps({ params }) {
  const til = await getTilBySlug(params.slug)
  return {
    props: {
      til: {
        ...til,
        content: til.content
      },
    },
    revalidate: 3
  }
}

export async function getStaticPaths() {
  const posts = await getAllTils()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}
