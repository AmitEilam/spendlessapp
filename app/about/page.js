import Image from 'next/image';
import image1 from '@/public/couple3-T.png';
import image2 from '@/public/couple2-T.png';
import LinkItem from '../_components/LinkItem';

export const metadata = {
  title: 'About / SpendLess',
};

export default function Page() {
  return (
    <div className='grid grid-cols-5 gap-x-24 md:gap-y-32 gap-y-10 text-lg items-center'>
      <div className='md:col-span-3 col-span-5'>
        <h1 className='text-4xl mb-10 text-primary-800 font-medium'>
          Managing Finances Today
        </h1>

        <div className='space-y-8'>
          <p>
            In today&apos;s fast-paced world, managing finances can be a
            daunting task. With numerous expenses, varying income sources, and
            the constant pressure to save for future goals, keeping track of
            your money effectively is more critical than ever. Proper financial
            management helps in identifying unnecessary expenditures, optimizing
            savings, and achieving financial stability.
          </p>
          <p>
            Without a clear understanding of where your money goes each month,
            it&apos;s easy to fall into debt or miss out on savings
            opportunities. Therefore, having a robust system to track and manage
            finances is essential for anyone looking to secure their financial
            future.
          </p>
        </div>
      </div>

      <div className='md:col-span-2 md:block col-span-4 hidden'>
        <Image src={image2} alt='couple photo1' placeholder='blur' />
      </div>

      <div className='relative aspect-square md:col-span-2 col-span-4'>
        <Image src={image1} fill className='object-cover' alt='couple photo2' />
      </div>

      <div className='md:col-span-3 col-span-5'>
        <h1 className='text-4xl mb-10 text-primary-800 font-medium'>
          What the App Offers
        </h1>

        <div className='space-y-8'>
          <p>
            Our financial management app simplifies the process of tracking and
            managing your money. With a user-friendly dashboard, you can gain a
            clear overview of your financial status at any time. The app allows
            you to connect your accounts and categorize your transactions
            effortlessly, providing real-time insights into your spending
            patterns.
          </p>
          <p>
            By offering detailed reports and budget management tools, the app
            helps you stay on top of your finances and make informed decisions.
            Whether you&apos;re looking to reduce expenses or save for a
            specific goal, our app provides the tools you need to take control
            of your financial life..
          </p>
        </div>
        <div className='mt-20'>
          <LinkItem href='/signup' msg='Sign up' />
          <LinkItem href='/login' msg='Login' />
        </div>
      </div>
    </div>
  );
}
