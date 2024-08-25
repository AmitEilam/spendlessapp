import Image from 'next/image';
import image1 from '@/public/couple3-T.png';
import image2 from '@/public/couple2-T.png';

export const metadata = {
  title: 'About / SpendLess',
};

export default function Page() {
  return (
    <div className='grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center'>
      <div className='col-span-3'>
        <h1 className='text-4xl mb-10 text-purple-800 font-medium'>
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

      <div className='col-span-2'>
        <Image src={image2} alt='couple photo1' placeholder='blur' />
      </div>

      <div className='relative aspect-square col-span-2'>
        <Image src={image1} fill className='object-cover' alt='couple photo2' />
      </div>

      <div className='col-span-3'>
        <h1 className='text-4xl mb-10 text-purple-800 font-medium'>
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
          <a
            href='/'
            className='bg-purple-800 px-6 py-4 text-white text-lg font-semibold transition-all rounded-full'
          >
            Start Today
          </a>
        </div>
      </div>
    </div>
  );
}
