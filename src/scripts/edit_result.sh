cat src/scripts/results/results_nmap_O.xml | grep -E 'addrtype="mac"|osmatch|osclass' > temp.txt

awk 'BEGIN{print ""}/addrtype="mac"/{print ""}1' temp.txt > temp_with_spaces.txt