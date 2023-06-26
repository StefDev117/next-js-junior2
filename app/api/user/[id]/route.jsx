import {connectToDB} from "@utils/database";
import User from "@models/user"

export const GET = async(request, {params}) => {
    console.log("route prompt");
    try {
        await connectToDB();
        console.log('je suis dans user back-end');
        const user = await User.findOne({_id: params.id});

        return new Response(JSON.stringify(user), {
            status: 200
        })
    } catch(err) {
        return new Response("Failed to fetch all prompts", {
            status: 500
        })
    }
}