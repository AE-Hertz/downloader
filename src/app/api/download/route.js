import { NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function POST(request) {
  try {
    console.log('Received API request'); // Debugging
    const body = await request.json();
    console.log('Request Body:', body); // Debugging

    const { url, quality, format } = body;

    if (!url || !ytdl.validateURL(url)) {
      console.error('Invalid YouTube URL:', url); // Debugging
      return NextResponse.json(
        { success: false, error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    console.log('Fetching video info for URL:', url); // Debugging
    const info = await ytdl.getInfo(url);

    console.log('Video Info:', info); // Debugging
    const downloadLink = ytdl.chooseFormat(info.formats, {
      quality: format === 'audio' ? 'highestaudio' : quality,
    }).url;

    console.log('Download Link:', downloadLink); // Debugging
    return NextResponse.json({ success: true, downloadLink });
  } catch (error) {
    console.error('Error in API:', error); // Debugging
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
