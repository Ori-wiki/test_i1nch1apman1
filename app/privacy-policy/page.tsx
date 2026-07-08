import styles from './PrivacyPolicy.module.scss'

export const metadata = {
  title: 'Политика обработки персональных данных | INCHAPIN',
}

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <h1>Согласие на обработку персональных данных клиентов — физических лиц</h1>
        <p>
          Данные, отправленные через форму обратной связи, используются только
          для обработки обращения и связи с пользователем.
        </p>
        <p>
          Отправляя форму, пользователь соглашается на обработку указанных имени,
          телефона и адреса электронной почты.
        </p>
      </article>
    </main>
  )
}
