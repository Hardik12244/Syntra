import type { Post } from "../types/Post";
type PostCard = {
    e: Post,
    onLike: (id: string) => void,
    userId: string;

}

export default function PostCard({ e, onLike, userId }: PostCard) {
    const isLiked = e.likes.includes(userId)

    return (
        <div className="p-4 text-wrap ">
            <div className="m-4 shadow-black/10 ring-1 ring-black/10  hover:shadow-lg transition hover:scale-105 duration-100 hover:-translate-y-1 shadow-md  w-full mx-auto bg-white rounded-2xl">
                {e.mediaType?.startsWith("image/") ? (
                    <img 
                    src={`http://localhost:3000/${e.media}`} 
                    className="w-full h-64 object-cover mb-2 rounded-2xl" 
                    alt="" />) : e.mediaType?.startsWith("video/") ? (
                    <video
                        src={`http://localhost:3000/${e.media}`}
                        controls
                        className="w-full h-64 object-cover mb-2 rounded-2xl"
                    />
                ) : null
                }

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

