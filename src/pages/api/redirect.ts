export const prerender = false

import type { APIRoute } from "astro"
import { supabase } from "../../lib/supabase"

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData()
    const alias = formData.get("alias")
    const { data, error } = await supabase.from("links").select("link").eq("alias", alias)
    console.log(alias, data)

    return redirect("/")
}