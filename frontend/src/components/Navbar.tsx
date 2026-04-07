export default function Navbar({ userId, user }) {
    console.log(user);
    console.log("userId:", userId);
    return (
        <div className="flex justify-between items-center m-4">
            <div>Syntra</div>
            <div>
                {userId ? (
                    user ? <h1>{user.name}</h1> : <span>Loading...</span>
                ) : (
                    <button className="bg-red-400">Login</button>
                )}

            </div>
        </div>
    )
}