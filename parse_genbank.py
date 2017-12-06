#!/usr/bin/python
"""
Parse the genbank output into a TSV file including:
	Accession, Primary Autho, Publication title, Pub_med_ID
"""


import argparse

parser=argparse.ArgumentParser()
parser.add_argument("--infile")
parser.add_argument("--outfile")

args=parser.parse_args()

fh=open(args.infile, "r")
out_fh=open(args.outfile, "w")


accession_info={}
check_title_on_extra_line=False
for line in fh:
	if line.startswith("VERSION"):
		line=line.strip()
		line=line.split()
		accession=line[1]
		go=True
		accession_info[accession]=[]
		continue
	if line.startswith("  AUTHORS"):
		if go:
			line=line.strip()
			line=line.split()
			authors=" ".join(line[1:])
			if authors not in accession_info[accession]:
				authors=authors.split(" ")
				primary_author=authors[0][:-1]
				accession_info[accession].append(primary_author)
			continue
	if line.startswith("  TITLE"):
		if go:
			line=line.strip()
			line=line.split()
			title=" ".join(line[1:])
			accession_info[accession].append(title)
			check_title_on_extra_line=True
			continue

	if check_title_on_extra_line:
		if line.startswith("            "):
			line=line.strip()
			accession_info[accession][1]=accession_info[accession][1]+line

	if line.startswith("  JOURNAL"):
		check_title_on_extra_line=False

	if line.startswith("   PUBMED"):
		if go:
			line=line.strip()
			line=line.split()
			pub_med_ID=line[1]
			accession_info[accession].append(pub_med_ID)
			go=False
			continue
	elif line.startswith('REFERENCE') and len(accession_info[accession])>0:
		go=False
		continue	

for accession, info in accession_info.iteritems():
	if len(info)<2: #no publication associated with entry
		info.append("NULL")
		


for accession, info in accession_info.iteritems():
	if len(info)!=3: #no pub med ID
		info.append("NULL")


for accession, info in accession_info.iteritems():
	out_fh.write(accession+"\t")
	for attribute in info:
		out_fh.write(str(attribute)+"\t")
	out_fh.write("\n")

