import Link from 'next/link'

export default function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-center leading-relaxed w-[360px]">
        Você ainda não registrou nenhuma lembraça, comece a{' '}
        <Link
          href="/memories/new"
          className="underline hover:text-gray-50 transition-colors"
        >
          criar agora!
        </Link>
      </p>
    </div>
  )
}
