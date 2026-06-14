#gamedev #programming #yt #performance
- game programming series by [[Casey Muratori]]
- [complete youtube playlist](https://www.youtube.com/watch?v=0CB1mYS5wBc&list=PLnuhp3Xd9PYTt6svyQPyRO_AAuMWGxPzU)
# main loop
```c++
static bool Running;

if (WindowHandle) {
	while (Running) {
		MSG Message;
		BOOL MessageResult = GetMessageA(&Message, 0 ,0, 0);
		if (MessageResult > 0) {
			TranslateMessage(&Message);
			DispatchMessage(&Message);
		}
	else {
		break;
	}
	}
}
```
# backbuffer
Slightly slower method but good for learning, render everything yourself and send it to Windows to show, later on you should leverage the GPU.
```c++
internal void
Win32ResizeDIBSection(int Width, int Height) {
	if (BitmapHandle) {
		DeleteObject(BitmapHandle);
	}

	BITMAPINFO BitmapInfo;
	BitmapInfo.bmiHeader.biSize = sizeof(BITMAPINFO.bmiHeader);
	BitmapInfo.bmiHeader.biWidth = Width;
	BitmapInfo.bmiHeader.biHeight = Height;
	BitmapInfo.bmiHeader.biPlanes = 1;
	BitmapInfo.bmiHeader.biBitCount = 32;
	BitmapInfo.bmiHeader.biCompression = BI_RGB;
	BitmapInfo.bmiHeader.biSizeImage = 0;
	...
	HDC DeviceContext = GetCompatibleDC(0);
	HBITMAP BitmapHandle = CreateDIBSection(
		DeviceContext, &BitmapInfo,
		DIB_RGB_COLORS, &BitmapMemory,
		0, 0);

	ReleaseContext(0, DeviceContext);
}

internal void
Win32UpdateWindow(HDC DeviceContext, int X, int Y, int Width, int Height) {
	StretchDIBits(  DeviceContext,
					X, Y, Width, Height,
					X, Y, Width, Height,
					const VOID *lpBits,
					const BITMAPINFO *lpBitsInfo,
					DIB_RGB_COLORS, SRCCOPY);
}
```

## Memory
```c++
global_variable void *BitmapMemory;
...
if (BitmapMemory) {
	VirtualFree(BitmapMemory, 0, MEM_RELEASE);
}

int BytesPerPixel = 4;
int BitmapMemorySize = (Width*Height)*BytesPerPixel;
BitmapMemory = VirtualAlloc(0, BitmapMemorySize, MEM_COMMIT, PAGE_READWRITE);
...
int WidownWidth = WindowRect->right - WindowRect->left;
int WidownHeight = WindowRect->bottom - WindowRect->top;
StretchDIBits(DeviceContext,
				0,0,BitmapWidth,BitmapHeight,
				0,0,WindowWidth,WindowHeight,
				BitmapMemory, &BitmapInfo,
				DIB_RGB_COLORS, SRCCOPY);
...
int Pitch = Width*BytesPerPixel;
uint8 *Row = (uint8 *)BitmapMemory;
for(int Y = 0; Y<BitmapHeight; ++Y) {
	uint8 *Pixel = (uint8 *)Row;
	for(int X = 0; X<BetmapWidth;; ++X) {
		// this is a little endian architecture
		// so the CPU puts the first BYTE in the lowest position in memory
		// 0xBBGGRRxx
		*Pixel = 0;
		++Pixel;
		*Pixel = 0;
		++Pixel;
		*Pixel = 255;
		++Pixel;
		*Pixel = 0; // padding to have 4B alignment
		++Pixel;
	}
	Row += Pitch;
}
```
## Animating the gradient
```c++
internal void
RenderWeirdGradient(int XOffset, intYOffset) {
	int Pitch = Width*BytesPerPixel;
	uint8 *Row = (uint8 *)BitmapMemory;
	for(int Y = 0; Y<BitmapHeight; ++Y) {
		uint8 *Pixel = (uint8 *)Row;
		for(int X = 0; X<BetmapWidth;; ++X) {
		// this is a little endian architecture
		// so the CPU puts the first BYTE in the lowest position in memory
		// 0xBBGGRRxx
			*Pixel = (uint8)(X + XOffset);
			++Pixel;
			*Pixel = (uint8)(Y + YOffset);
			++Pixel;
			*Pixel = 0;
			++Pixel;
			*Pixel = 0; // padding to have 4B alignment
			++Pixel;
		}
		Row += Pitch;
	}
}
```
## Non Blocking msg queue
```c++
int XOffset = 0;
int YOffset = 0;
while(Running) {
	MSG Message;
	while(PeekMessage(&Message,0,0,0,PM_REMOVE)) {
		if(Message.message == WM_QUIT) {
			Running = false;
		}
		TranslateMessage(&Message);
		DispatchMessage(&Message);
	}
	RenderWeirdGradient(XOffset, YOffset);
	HDC DeviceContext = GetDC(WindowHandle);
	...
	Win32UpdateWindow(DeviceContext, WindowRect, 
						0, 0, WindowWidth, WindowHeight);
	ReleaseDC(WindowHandle, DeviceContext);
	++XOffset;
}
```
