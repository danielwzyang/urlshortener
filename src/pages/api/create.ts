export const prerender = false

import type { APIRoute } from "astro"
import { supabase } from "../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData()
    const alias = formData.get("alias")?.toString(), link = formData.get("link")?.toString()

    if (!alias || !link)
        return new Response("Alias and link required.", { status: 500 })

    if (!isURL(link))
        return new Response("Link is invalid.", { status: 500 })

    const { error } = await supabase.from("links").insert({ alias, link })

    if (error)
        if (error.code == "23505")
            return new Response("Alias is unavailable.", { status: 500 })
        else 
            return new Response("Error while inserting data: " + error.code, { status: 500 })

    return new Response("URL shortened successfully!", { status: 200 })
}

function isURL(s: string) {
    try {
        new URL(s)
        return true
    } catch (_) {
        try {
            new URL("https://" + s)
            return true
        } catch(_) {
            return false
        }
    }
}