'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FloatingInput } from './FloatingInput/FloatingInput';
import { FormSubmitButton } from './FormSubmitButton/FormSubmitButton';
import styles from './ContactForm.module.scss';

const schema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().refine(
    (val) => {
      const digits = val.replace(/\D/g, '');
      return digits.length === 11;
    },
    { message: 'Введите полный номер телефона' },
  ),
  email: z.string().min(1, 'Введите email').email('Некорректный формат email'),
});

type FormValues = z.infer<typeof schema>;

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { name: '', phone: '', email: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Данные формы:', data);
    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      {isSubmitted ? (
        <div className={styles.successMessage}>
          <h2>Заявка отправлена</h2>
          <p>Наш менеджер скоро свяжется с вами.</p>
        </div>
      ) : (
        <>
          <h2 className={styles.title}>Заказать звонок</h2>

          <FloatingInput
            label='Имя'
            name='name'
            control={control}
            error={errors.name}
          />
          <FloatingInput
            label='Телефон'
            name='phone'
            control={control}
            error={errors.phone}
            isPhone
          />
          <FloatingInput
            label='Email'
            name='email'
            control={control}
            error={errors.email}
            type='email'
          />

          <span className={styles.disclaimer}>
            Нажимая на кнопку «Отправить», вы ознакомлены и соглашаетесь с{' '}
            <a href='/privacy-policy' target='_blank' rel='noreferrer'>
              политикой обработки персональных данных
            </a>
          </span>

          <FormSubmitButton isSubmitting={isSubmitting} label='Отправить' />
        </>
      )}
    </form>
  );
};
