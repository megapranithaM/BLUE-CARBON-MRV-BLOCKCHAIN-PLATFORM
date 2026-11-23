import os
import re

root_dir = r"c:\Users\megam\OneDrive\Desktop\block\Blue-Carbon-Registry-and-MRV-System\bluecarbon-frontend\app"
target = "भारत सरकार"
replacement = "தமிழ்நாடு அரசு"

for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith((".js", ".jsx", ".html")):
            file_path = os.path.join(subdir, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if target in content:
                print(f"Fixing {file_path}")
                new_content = content.replace(target, replacement)
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

print("Done")
