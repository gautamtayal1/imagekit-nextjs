import { connectToDatabase } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"
import User from "@/models/User"

export async function POST (request: NextRequest) {
  try {
    const {email, password} = await request.json()
    if(!email || !password) {
      return NextResponse.json(
        {error: "Email and password are required"},
        {status: 400}
      )
    }
    await connectToDatabase()
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return NextResponse.json(
        {error: "email already exists, please login"},
        {status: 400}
      )
    }
    await User.create({
      email,
      password
    })
    return NextResponse.json(
      {message: "user registered successfully"},
      {status: 201}
    )

  } catch(error) {
      return NextResponse.json(
        {error: "failed to register user"},
        {status: 500}
      )
    }
}
