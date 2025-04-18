import os
import shutil
from pathlib import Path
import logging
from datetime import datetime, timedelta
# ============================================================================
# HARDCODED CONFIGURATION - MODIFY THESE VALUES DIRECTLY
# ============================================================================
# Option to only clear output directory without generating new files
CLEAR_ONLY = False
# Option to only include recently modified files
RECENT_FILES_ONLY = False
# Option to substitute current user in pathsX
USE_CURRENT_USER = True
# Recent files threshold in minutes (only used if RECENT_FILES_ONLY is True)
RECENT_THRESHOLD_MINUTES = 30
# Input directories to consolidate with configuration options

# Now Analysis
SOURCE_DIRS = {
    r"C:\Users\mikeg\projects\nextla_astro": {"include_nested": False},
    r"C:\Users\mikeg\projects\nextla_astro\src": {"include_nested": True},
}
# # Link Warden
# SOURCE_DIRS = {
#     r"C:\Users\mikeg\Downloads\browser-extension-main\browser-extension-main": {"include_nested": False},
#     r"C:\Users\mikeg\Downloads\browser-extension-main\browser-extension-main\src": {"include_nested": True},
# }

OUTPUT_DIR = r"C:\Users\mikeg\projects\nextla_astro\_consolidated"
# File types to process (without the dot)
INCLUDED_EXTENSIONS = ["py", "md", "sql", "json", "toml", "pgsql", "js", "sh", "astro", "mjs",
                       "jsx", "ts", "tsx", "css", "html", "xml", "yaml", "yml", "ini"]
# Directories and files to exclude (exact name matches)
EXCLUDED_ITEMS = ["node_modules", ".git", "__pycache__", ".venv", "data", "tests", "pnpm-lock.yaml"]
# File size constraints
MAX_FILE_SIZE = 50000      # Target max file size in characters
MIN_SECTION_SIZE = 10000   # Min size before starting new section

logger = logging.getLogger(__name__)

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
        logger.warning(f"Failed to resolve user path: {e}")
        return path

def clear_output_directory():
    """Delete the output directory entirely without recreating it."""
    output_path = Path(resolve_user_path(OUTPUT_DIR))
    if output_path.exists():
        logger.info(f"Deleting output directory: {output_path}")
        try:
            shutil.rmtree(output_path)
            logger.info(f"Output directory deleted: {output_path}")
        except Exception as e:
            logger.error(f"Error deleting output directory {output_path}: {e}")

def is_recently_modified(file_path, threshold_minutes):
    """Check if the file was modified within the threshold period."""
    try:
        mod_time = datetime.fromtimestamp(file_path.stat().st_mtime)
        now = datetime.now()
        return (now - mod_time) <= timedelta(minutes=threshold_minutes)
    except Exception as e:
        logger.error(f"Error checking modification time for {file_path}: {e}")
        return False

def load_documents(source_dirs):
    """Load all documents from source directories based on file types."""
    documents = []

    for source_dir, options in source_dirs.items():
        # Resolve user path
        resolved_dir = resolve_user_path(source_dir)
        source_path = Path(resolved_dir)
        include_nested = options.get("include_nested", True)

        if not source_path.exists():
            logger.warning(f"Source directory does not exist: {resolved_dir}")
            continue

        logger.info(f"Scanning directory: {resolved_dir} (nested: {include_nested})")

        if include_nested:
            # Walk through directory tree for nested folders
            for root, dirs, files in os.walk(source_path):
                # Skip excluded directories
                dirs[:] = [d for d in dirs if d not in EXCLUDED_ITEMS]

                _process_files(root, files, documents)
        else:
            # Only process files in the top-level directory
            try:
                files = [f.name for f in source_path.iterdir() if f.is_file()]
                _process_files(source_path, files, documents)
            except Exception as e:
                logger.error(f"Error accessing directory {source_path}: {e}")

    return documents

def _process_files(root_path, files, documents):
    """Process files from a directory and add to documents list."""
    root_path = Path(root_path)

    for file in files:
        # Skip excluded files
        if file in EXCLUDED_ITEMS:
            continue

        file_path = root_path / file
        file_extension = file_path.suffix.lstrip('.')

        if file_extension not in INCLUDED_EXTENSIONS:
            continue

        # Skip files that aren't recently modified if RECENT_FILES_ONLY is True
        if RECENT_FILES_ONLY and not is_recently_modified(file_path, RECENT_THRESHOLD_MINUTES):
            logger.debug(f"Skipping non-recent file: {file_path}")
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            doc = {
                "path": file_path,
                "content": content,
                "size": len(content),
                "file_type": file_extension,
                "is_index": file_path.name.lower() in ('index.md', '__init__.py'),
                "group": file_path.parent.name if file_path.name.lower() in ('index.md', '__init__.py') else file_path.stem
            }

            documents.append(doc)
            logger.debug(f"Loaded {file_path.name} ({doc['size']} chars)")
        except Exception as e:
            logger.error(f"Error loading {file_path}: {e}")

def add_document_to_section(section, doc):
    """Add document content to section with proper formatting."""
    # Add header to first document in the section
    if not section["content"]:
        if doc["file_type"] == 'py':
            section["content"].append("# Consolidated Python Code\n")
            section["content"].append("# This file contains multiple Python files combined for easier processing.")
            section["content"].append("# Each file is separated by a header that includes the original filename.")
            section["content"].append("# ============================================================================\n")
        else:
            section["content"].append("# Consolidated Document\n")
            section["content"].append("# This file contains multiple files combined for easier processing.")
            section["content"].append("# Each file is separated by a header that includes the original filename.")
            section["content"].append("# ============================================================================\n")

    # Add separator between documents
    elif section["content"]:
        section["content"].append("\n# " + "=" * 78 + "\n")

    # Add file name header for each document
    section["content"].append(f"# File: {doc['path']}\n# " + "=" * 78 + "\n")

    # Add the actual document content
    section["content"].append(doc["content"])

    # Update section metadata
    section["size"] += doc["size"]
    section["document_count"] += 1
    section["groups"].append(doc["group"])

    return True

def process_documents(documents):
    """Process documents into sections."""
    # Create two types of sections: Python and Other
    sections = {}

    # Group documents by Python vs non-Python
    py_docs = [doc for doc in documents if doc["file_type"] == "py"]
    other_docs = [doc for doc in documents if doc["file_type"] != "py"]

    # Sort documents by name
    py_docs.sort(key=lambda d: (d["group"], not d["is_index"], str(d["path"])))
    other_docs.sort(key=lambda d: (d["file_type"], d["group"], not d["is_index"], str(d["path"])))

    # Process Python documents
    py_section_counter = 1
    current_py_section = None

    for doc in py_docs:
        # If no current section or current section would be too large
        if (current_py_section is None or
            (current_py_section["size"] > MIN_SECTION_SIZE and
             current_py_section["size"] + doc["size"] > MAX_FILE_SIZE)):

            # Create new section
            section_name = f"section_{py_section_counter}.py"
            current_py_section = {
                "name": section_name,
                "content": [],
                "size": 0,
                "document_count": 0,
                "groups": [],
                "file_type": "py"
            }
            sections[section_name] = current_py_section
            py_section_counter += 1

        # Add document to current section
        add_document_to_section(current_py_section, doc)

    # Process other documents
    other_section_counter = 1
    current_other_section = None

    for doc in other_docs:
        # If no current section or current section would be too large
        if (current_other_section is None or
            (current_other_section["size"] > MIN_SECTION_SIZE and
             current_other_section["size"] + doc["size"] > MAX_FILE_SIZE)):

            # Create new section
            section_name = f"section_{other_section_counter}.txt"
            current_other_section = {
                "name": section_name,
                "content": [],
                "size": 0,
                "document_count": 0,
                "groups": [],
                "file_type": "txt"
            }
            sections[section_name] = current_other_section
            other_section_counter += 1

        # Add document to current section
        add_document_to_section(current_other_section, doc)

    return sections

def write_output(output_dir, sections):
    """Write consolidated sections to output files."""
    # Create output directory if it doesn't exist
    resolved_output_dir = resolve_user_path(output_dir)
    output_path = Path(resolved_output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    for name, section in sections.items():
        if not section["content"]:
            continue

        output_file = output_path / name
        content = "\n".join(section["content"])

        try:
            # Write with UTF-8 encoding
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(content)
            logger.info(f"Created {output_file.name} ({section['size']} chars, {section['document_count']} documents)")
            logger.debug(f"  Contains: {', '.join(section['groups'])}")
        except Exception as e:
            logger.error(f"Error writing {output_file}: {e}")

def main():
    """Consolidate files from source directories."""
    try:
        # Always clear the output directory first
        clear_output_directory()

        # If CLEAR_ONLY is True, exit without generating files
        if CLEAR_ONLY:
            logger.info("CLEAR_ONLY is set to True. Output directory has been deleted. Exiting without generating files.")
            return

        # Create the output directory for file generation
        output_path = Path(resolve_user_path(OUTPUT_DIR))
        logger.info(f"Creating output directory: {output_path}")
        output_path.mkdir(parents=True, exist_ok=True)

        # Log recent files mode if enabled
        if RECENT_FILES_ONLY:
            logger.info(
                f"RECENT_FILES_ONLY is enabled. Only processing files modified in the last {RECENT_THRESHOLD_MINUTES} minutes.")

        # Load all documents
        logger.info(f"Loading files from {len(SOURCE_DIRS)} directories")
        documents = load_documents(SOURCE_DIRS)
        logger.info(f"Loaded {len(documents)} documents")

        # Handle empty document case
        if not documents:
            if RECENT_FILES_ONLY:
                logger.info(f"No files modified in the last {RECENT_THRESHOLD_MINUTES} minutes were found.")
            else:
                logger.info("No files matching the criteria were found.")
            return

        # Process into sections
        logger.info("Processing documents into sections")
        sections = process_documents(documents)

        # Write output
        logger.info(f"Writing {len(sections)} consolidated files to {resolve_user_path(OUTPUT_DIR)}")
        write_output(OUTPUT_DIR, sections)

        logger.info("Consolidation complete")

    except Exception as e:
        logger.error(f"Consolidation failed: {str(e)}", exc_info=True)


# Run the script
main()
