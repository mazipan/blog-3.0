import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Link from 'next/link'

import MarkdownParser from '__components/Markdown/MarkdownContent'
import PostHeader from '__components/PostDetail/Heading'
import PostFooter from '__components/PostDetail/Footer'

import Meta from '__components/Meta/Custom'
import InfoBox from '__components/InfoBox'
import CommentBox from '__components/CommentBox'
import ShareArticle from '__components/ShareBox'
import Related from '__components/Post/Related'

import LayoutArticle from '__components/Layout/Article'

import { getPostBySlug, getAllPosts, getRelatedPost, DEFAULT_FIELDS } from '__lib/api'
import { SITE_METADATA } from '__lib/constants'

export default function Post ({ post, related, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <LayoutArticle preview={preview}>
        <>
          <Meta
            lang="id"
            title={`${post.title} // mazipan.space`}
            description={post.excerpt}
            url={`${SITE_METADATA.url}/${post.slug}`}
            coverImage={`${SITE_METADATA.url}${post.coverImage}`}
            tag={`${post.tags[0]}`}
          />
          <PostHeader
            lang="id"
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            tags={post.tags}
          />
          {post.enready && (
            <InfoBox>
              Available in other languages:{' '}
              <ul>
                <li>
                  <Link as={`/en/${post.slug}`} href="/en/[slug]">
                    <a className="font-bold underline">🇬🇧 English</a>
                  </Link>
                </li>
              </ul>
            </InfoBox>
          )}
          <MarkdownParser content={post.content} />
          <PostFooter fileLocation={post.fileLocation} />
          <ShareArticle text={post.title} url={`${SITE_METADATA.url}/${post.slug}`} />
          <CommentBox />
          <Related posts={related} lang="id" />
        </>
      </LayoutArticle>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const post = await getPostBySlug(
    params.slug,
    [
      'title',
      'date',
      'excerpt',
      'slug',
      'author',
      'content',
      'tags',
      'coverImage',
      'enready',
      'published',
      'featured'
    ],
    'id'
  )

  const related = await getRelatedPost(post.tags[0], post.slug, 'id')

  return {
    props: {
      post: {
        ...post,
        content: post.content
      },
      related
    },
    revalidate: 3
  }
}

export async function getStaticPaths () {
  const posts = await getAllPosts(DEFAULT_FIELDS, 'id')

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
