import os
import glob
import re
from pathlib import Path
# ============================================================================
# HARDCODED CONFIGURATION - MODIFY THESE VALUES DIRECTLY
# ============================================================================
# Option to substitute current user in paths
USE_CURRENT_USER = True
# Directories to search in (add or remove paths as needed)
SOURCE_DIRS = [
    r"C:\Users\mikeg\projects\nextla_astro"
]
OUTPUT_FILE = r"C:\Users\mikeg\projects\nextla_astro\_consolidated\file_structure.txt"
# File patterns to include
FILE_PATTERNS = ['*.py', '*.md', '*.sql', '*.json', '*.toml', '*.csv', '*.xlsx', '*.js', "*.astro", "*.png", "*.svg", "*.ico", "*.webp", "*.jpg", "*.jpeg", "*.gif", "*.bmp", "*.tiff", "*.ico", "*.webp", "*.jpg", "*.jpeg", "*.gif", "*.bmp", "*.tiff", "*.mjs",
                 '*.jsx', '*.ts', '*.tsx', '*.css', '*.html', '*.xml', '*.yaml', '*.yml', '*.ini']
# Patterns to exclude (directories or files)
EXCLUDE_PATTERNS = [
    '*venv*', '*node_modules*', '*.git*', 'bak', '.recycle',
    '*__pycache__*', '*archive*', '*scripts*', '*claude*',
    '.pytest_cache', '*.egg-info', '_archive', 'tests'
]
# Whether to include folders in the output
INCLUDE_FOLDERS = True
# Whether to use relative paths in the output
USE_RELATIVE_PATHS = False
# ============================================================================

def resolve_user_path(path):
    """Replace the username in a path with the current user's name if enabled."""
    if not USE_CURRENT_USER:
        return path

    try:
        # Get the current user's home directory
        user_home = Path.home()
        path_str = str(path)

        # Check if this is a Windows path with \Users\
        if "\\Users\\" in path_str:
            # Extract the parts of the path
            parts = path_str.split("\\Users\\", 1)
            if len(parts) > 1:
                username_and_rest = parts[1].split("\\", 1)
                if len(username_and_rest) > 1:
                    # Reconstruct with the current user
                    return f"{parts[0]}\\Users\\{user_home.name}\\{username_and_rest[1]}"

        # Return original path if we couldn't parse it
        return path
    except Exception as e:
        print(f"Failed to resolve user path: {e}")
        return path

def find_all_folders(directory, recursive=True, exclude_patterns=None):
    """Find all folders in the directory, including empty ones."""
    # Resolve user path
    directory = resolve_user_path(directory)
    if exclude_patterns is None:
        exclude_patterns = []

    all_folders = []

    for root, dirs, _ in os.walk(directory):
        # Filter out excluded directories to avoid traversing them
        dirs[:] = [d for d in dirs if not any(re.search(pat.replace('*', '.*'), os.path.join(root, d))
                                              for pat in exclude_patterns)]

        # Add each directory to the results if it doesn't match exclude patterns
        for dir_name in dirs:
            dir_path = os.path.join(root, dir_name)
            if not any(re.search(pat.replace('*', '.*'), dir_path) for pat in exclude_patterns):
                all_folders.append(dir_path)

        # Stop recursion if not recursive
        if not recursive:
            break

    return all_folders

def get_files_from_directory(directory, patterns, recursive=True, exclude_patterns=None, include_folders=True):
    """Get files from a directory matching the patterns."""
    # Resolve user path
    directory = resolve_user_path(directory)
    if exclude_patterns is None:
        exclude_patterns = []

    all_files = []
    all_folders = []

    # Process each pattern
    for pattern in patterns:
        # Determine glob pattern based on recursion setting
        if recursive:
            glob_pattern = os.path.join(directory, '**', pattern)
            matches = glob.glob(glob_pattern, recursive=True)
        else:
            glob_pattern = os.path.join(directory, pattern)
            matches = glob.glob(glob_pattern)

        # Process matches
        for match in matches:
            if os.path.isfile(match):
                # Only add file if it doesn't match any exclude pattern
                if not any(re.search(pat.replace('*', '.*'), match) for pat in exclude_patterns):
                    all_files.append(match)
            elif os.path.isdir(match) and include_folders:
                # Only add directory if it doesn't match any exclude pattern
                if not any(re.search(pat.replace('*', '.*'), match) for pat in exclude_patterns):
                    all_folders.append(match)

    # If include_folders is True, add all folders including empty ones
    if include_folders:
        found_folders = find_all_folders(directory, recursive, exclude_patterns)
        all_folders.extend(found_folders)

    # Remove duplicates from folders list
    all_folders = list(set(all_folders))

    # Combine files and folders
    all_paths = all_files + all_folders if include_folders else all_files

    return all_paths

def convert_to_relative_paths(paths, base_dir):
    """Convert absolute paths to relative paths."""
    base_path = Path(base_dir)
    relative_paths = []

    for path in paths:
        try:
            rel_path = Path(path).relative_to(base_path)
            relative_paths.append(str(rel_path))
        except ValueError:
            # If relative path can't be computed, use absolute
            relative_paths.append(path)

    return relative_paths

def save_file_list(file_paths, output_file=None):
    """Save the list of file paths to a text file."""
    if output_file is None and SOURCE_DIRS:
        # Use first source directory as base for output file
        output_dir = resolve_user_path(SOURCE_DIRS[0])
        output_file = os.path.join(output_dir, "file_structure.txt")
    else:
        output_file = resolve_user_path(output_file)

    # Create output directory if it doesn't exist
    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Write the file list
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(file_paths))

    return output_file

def list_files():
    """Main function to list files from specified directories."""
    all_paths = []

    print(f"Processing {len(SOURCE_DIRS)} directories")

    # Process each source directory
    for directory in SOURCE_DIRS:
        resolved_dir = resolve_user_path(directory)
        dir_path = Path(resolved_dir)

        if not dir_path.exists():
            print(f"Warning: Directory does not exist: {resolved_dir}")
            continue

        print(f"Scanning directory: {resolved_dir}")

        # Get files and folders from this directory
        dir_paths = get_files_from_directory(
            directory=resolved_dir,
            patterns=FILE_PATTERNS,
            recursive=True,
            exclude_patterns=EXCLUDE_PATTERNS,
            include_folders=INCLUDE_FOLDERS
        )

        # Convert to relative paths if requested
        if USE_RELATIVE_PATHS:
            dir_paths = convert_to_relative_paths(dir_paths, resolved_dir)

        # Add to overall list
        all_paths.extend(dir_paths)

    # Remove duplicates and sort
    all_paths = sorted(list(set(all_paths)))

    # Count files and folders
    if USE_RELATIVE_PATHS:
        # When using relative paths, check if path contains directory separators
        file_count = sum(1 for path in all_paths if '/' not in path and '\\' not in path)
    else:
        # When using absolute paths, we can check the filesystem directly
        file_count = sum(1 for path in all_paths if os.path.isfile(path))

    folder_count = len(all_paths) - file_count

    # Save to file
    output_file = save_file_list(all_paths, OUTPUT_FILE)

    # Print summary
    print(f"\nTotal items found: {len(all_paths)}")
    if INCLUDE_FOLDERS:
        print(f"Files: {file_count}")
        print(f"Folders: {folder_count}")
    print(f"Results saved to: {output_file}")

    # Print sample of found items
    print("\nSample of items found:")
    for path in all_paths[:10]:
        if USE_RELATIVE_PATHS:
            item_type = "Folder" if '/' in path or '\\' in path else "File"
        else:
            item_type = "Folder" if os.path.isdir(path) else "File"

        print(f"  - [{item_type}] {path}")

    if len(all_paths) > 10:
        print(f"  ... and {len(all_paths) - 10} more")

    return all_paths

def main():
    """Main execution function."""
    print("Starting file listing process")
    list_files()
    print("File listing complete")


# Run the script
main()
