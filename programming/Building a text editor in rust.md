#editor #rust #programming
Source: https://philippflenker.com/hecto-chapter-1/

# Cargo
differences between debug and release builds
- faster compile for debug
- debug crashes on purpose on some errors to show the programmer
- optimizations for release
- `cargo run` builds and run the main program
# Modes
- canonical mode or cooked
	- keyboard input is only sent on `Enter`
- raw mode
    `enable_raw_mode().unwrap();`
    `disable_raw_mode().unwrap();`
# Reading bytes
```rust
for b in io::stdin().bytes() {
    match b {
         Ok(b) => {
            let c = b as char;
            if c.is_control() {
                println!("Binary: {:08b} ASCII: {0:#03}\r", b);
            } else {
                println!("Binary: {:08b} ASCII: {0:#03} Char: {1:#?}\r", b, c);
            }

            if c == 'q' {
                break;
            }
        }
        Err(e) => println!("Error: {}", e),
    }
}
```
