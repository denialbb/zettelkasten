- need to build using the SDL backend
	- otherwise GLFW is all broken on WL

`❯ git clone https://github.com/raysan5/raylib.git raylib`
`❯ cd raylib`
`❯ mkdir build && cd build`
`❯ cmake -DPLATFORM=SDL -DBUILD_SHARED_LIBS=ON ..`
`❯ cd ..`
`❯ make`
`❯ sudo make install`
`❯ sudo ldconfig`