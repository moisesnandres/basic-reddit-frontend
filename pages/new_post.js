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
    <div className={styles.wrapper}>
      <nav>
        <Link href="/">
          <a>Go back to posts</a>
        </Link>
      </nav>
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
            <div className={styles.inputGroup}>
              <label htmlFor="title">Title</label>
              <Field name="title" id="title" />
              {errors.title && touched.title ? (
                <div className={styles.inputError}>{errors.title}</div>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="content">Content</label>
              <Field name="content" id="content" component="textarea" />
              {errors.content && touched.content ? (
                <div className={styles.inputError}>{errors.content}</div>
              ) : null}
            </div>
            <button type="submit" className={styles.submit}>Save</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
