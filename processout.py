#!/usr/bin/env python

import os
import sys

file_to_read = open('testout.txt', 'r')
file_lines = file_to_read.readlines()
file_to_read.close()

jt = "var data = [\n"
first=True

for line in file_lines:
    splitline = line.split('\t')

    if splitline[0] == "pod_name":
    	if not first:
            jt += "],\n["
        else:
            jt += "["
            first=False

    else:
    	if not splitline[2].startswith("s-"):
            ram = float(splitline[5])
            usedram = float(splitline[6])
            percentram = int(round((usedram/ram)*100))
    	    jt += "{'server': '" + splitline[2] + "', value: '" + str(percentram) + "'},"


jt += "]\n];\n"

file_to_write = open('implicit-ded-cated-planner-250vms1GBeach.json', 'w')
file_to_write.truncate()
file_to_write.write(jt)
file_to_write.close()
