import HttpError from "standard-http-error"

export const post = async (path: string, body: BodyInit) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/${path}`, {
    method: "POST",
    body,
    credentials: "include",
  })
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText)
  }
  return response.json()
}
