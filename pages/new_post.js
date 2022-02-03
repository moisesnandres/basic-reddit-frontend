import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import styles from '../styles/Home.module.css'

const PostSchema = Yup.object().shape({
   title: Yup.string()
     .max(50, 'Too Long!')
     .required('Required'),
   content: Yup.string()
     .max(200, 'Too Long!')
     .required('Required')
 });

export default function NewPost() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Link href="/">
        <a>Go back to posts</a>
      </Link>
      <h1>New Post</h1>
      <Formik
        initialValues={{ title: '', content: '' }}
        validationSchema={PostSchema}
        onSubmit={values => {
          axios.post('http://localhost:3000/posts', values)
               .then(() => router.push('/'))
               .catch(er => console.error(er))
          setSubmitting(false)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="title" />
            {errors.title && touched.title ? (
              <div>{errors.title}</div>
            ) : null}
            <Field name="content" />
            {errors.content && touched.content ? (
              <div>{errors.content}</div>
            ) : null}
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
