import type { Post } from "../types/Post";
type PostCard = {
    e: Post,
    onLike: (id: string) => void
}
export default function PostCard({ e, onLike }: PostCard) {
    const userId = "69bfa985637c6b49b02cbb05";
    const isLiked = e.likes.includes(userId)

    return (
        <div className="p-4 text-wrap">
            <div className="m-4 hover:shadow-md transition hover:scale-105 duration-60 hover:-translate-y-1 shadow-md  w-full mx-auto bg-white rounded-2xl">
                <img src={e.image} className="w-full h-64 object-cover mb-2 rounded-2xl" alt="" />

                <div className="p-2">
                    <div className="  text-2xl font-bold mb-2">{e.user.name}</div>
                    <div className=" flex gap-6 text-xl mb-2">
                        <div className="flex items-center gap-1">
                            <button className="mr-1 cursor-pointer transition hover:scale-110 duration-200" onClick={() => onLike(e._id)}>
                                {isLiked ? "❤️" : "♡"}
                            </button>
                            {e.likes.length}
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="mr-1 cursor-pointer transition hover:scale-110 duration-200" onClick={() => onLike(e._id)}>💬</button>
                            {e.likes.length}
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="mr-1 cursor-pointer transition hover:scale-110 duration-200" onClick={() => onLike(e._id)}>🔁</button>
                            {e.likes.length}
                        </div>

                    </div>
                    <div className="text-sm break-words whitespace-normal">{e.caption}</div>
                </div>


            </div>
        </div>

    )
}

